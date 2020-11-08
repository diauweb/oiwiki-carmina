import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Grid from '@material-ui/core/Grid'
import MonacoEditor from 'react-monaco-editor'
import MDRenderer from '../lib/MDRenderer'

import toHAST from '../lib/chika'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// type here',
      codeAst: {},
    }
  }

  onChange(/* newValue, e */) {
    toHAST(this.state.code)
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
              value={this.state.code}
              onChange={this.onChange.bind(this)}
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
