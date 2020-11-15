import reactiveHast from './reactive-hast'
import React from 'react'

export default function MDRenderer ({ components, htmlAst }) {
  const comps = components || {}
  try {
    return <div style={{}}>
      { reactiveHast({ ...htmlAst, tagName: 'div' }, comps) }
    </div>
  } catch(e){
    return <p style={{ color: 'red' }}>Error: {e.toString()}</p>
  }
}
