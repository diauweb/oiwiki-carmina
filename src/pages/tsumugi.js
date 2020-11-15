import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import Details from '../components/Details'
import Summary from '../components/Summary'
// import MonacoEditor from 'react-monaco-editor'
import PropTypes from 'prop-types'
import MDRenderer from '../lib/MDRenderer'

import toHAST from '../lib/chika'
import { adaptiveTheme, LightCssBaseline } from '../theme'
class EditorSkeleton extends React.Component {

  constructor(props) {
    super(props)
    const { height, width } = props
    this.height = height
    this.width = width
  }

  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  render() {
    return <Skeleton 
      variant="rect" 
      width={this.width} 
      height={this.height}
      animation="wave" 
    />
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeAst: { tagName: 'div', children: [{ type: 'text', value: 'Type something left...' }] },
      monacoInstance: EditorSkeleton
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

  async componentDidMount() {
    const Monaco = (await import('react-monaco-editor')).default
    this.setState({ monacoInstance: Monaco })
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
            <this.state.monacoInstance
              width="49vw" 
              height="90vh" 
              language="markdown"
              automaticLayout="true"
              onChange={this.onChange.bind(this)}
              ref={this.monacoRef}
            />
          </Grid>
          <Grid item style={{ 'maxWidth': '49vw', overflowX: 'scroll' }}>
            <ThemeProvider theme={adaptiveTheme}>
              <CssBaseline />
              <LightCssBaseline/>
              <MDRenderer components={this.myComponents} htmlAst={this.state.codeAst} />
            </ThemeProvider>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default Editor
