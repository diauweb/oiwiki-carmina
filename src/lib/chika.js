import Remark from 'remark-parse'
import unified from 'unified'
import reparseRaw from 'rehype-raw'
import stripPosition from 'unist-util-remove-position'
import tohast from 'mdast-util-to-hast'
import detab from 'detab'
import u from 'unist-builder'

const remarkOptions = {
    commonmark: true,
    footnotes: true,
    gfm: true,
    pedantic: true,
}

const hastHandlers = {
    // `inlineCode` gets passed as `code` by the HAST transform.
    // This makes sure it ends up being `inlineCode`
    inlineCode(h, node) {
      return Object.assign({}, node, {
        type: 'element',
        tagName: 'inlineCode',
        properties: {},
        children: [
          {
            type: 'text',
            value: node.value
          }
        ]
      })
    },
    code(h, node) {
      const value = node.value ? detab(node.value + '\n') : ''
      const lang = node.lang
      const props = {}

      if (lang) {
        props.className = ['language-' + lang]
      }

      // MDAST sets `node.meta` to `null` instead of `undefined` if
      // not present, which React doesn't like.
      props.metastring = node.meta || undefined

      const meta =
        node.meta &&
        node.meta.split(' ').reduce((acc, cur) => {
          if (cur.split('=').length > 1) {
            const t = cur.split('=')
            acc[t[0]] = t[1]
            return acc
          }

          acc[cur] = true
          return acc
        }, {})

      if (meta) {
        Object.keys(meta).forEach(key => {
          const isClassKey = key === 'class' || key === 'className'
          if (props.className && isClassKey) {
            props.className.push(meta[key])
          } else {
            props[key] = meta[key]
          }
        })
      }

      return h(node.position, 'pre', [
        h(node, 'code', props, [u('text', value)])
      ])
    },
  }

const remarkPipe = new Remark().data(`settings`, remarkOptions)
const rehypePipe = unified().use(reparseRaw)
export default function toHAST(md) {
    let markdownAST = remarkPipe.parse(md)
    markdownAST = remarkPipe.run(markdownAST)


    return stripPosition(rehypePipe.runSync(tohast(markdownAST, {
        allowDangerousHTML: true,
        handlers: hastHandlers,
    })))

}