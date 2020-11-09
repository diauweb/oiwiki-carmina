import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Grid from '@material-ui/core/Grid'
import Details from '../components/Details'
import Summary from '../components/Summary'
import MonacoEditor from 'react-monaco-editor'
import MDRenderer from '../lib/MDRenderer'

import toHAST from '../lib/chika'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeAst: { tagName: 'div', children: [{ type: 'text', value: 'Type something left...' }] },
    }
    this.monacoRef = React.createRef()
    
    this.myComponents = {
      details: Details,
      summary: Summary,
      // a: Link(location),
      inlineCode: 'code',
      inlinecode: 'code',
    }
  }

  onChange() {
    const code = this.monacoRef.current.editor.getValue()
    this.setState({ codeAst: toHAST(code) })
  }

  render(){
    return (
      <Layout>
        <SEO title="Editor"/>
        <Grid container direction="row">
          <Grid item>
            <MonacoEditor 
              width="50vw" 
              height="100vh" 
              language="markdown"
              onChange={this.onChange.bind(this)}
              ref={this.monacoRef}
            />
          </Grid>
          <Grid item>
            <MDRenderer components={[]} htmlAst={this.state.codeAst} />
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default Editor
