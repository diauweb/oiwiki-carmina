import React from 'react'

import Layout from '../components/layout'
// import Image from '../components/image'
import SEO from '../components/seo'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'

const IndexPage = () => {
  return(
    <Layout>
      <SEO title="Home" />
      <Grid container spacing={3} justify="center">
        <Grid item xs={8}>
          <h1>OI Wiki Carmina</h1>
          <h5>
            A demo online editor for OI Wiki
          </h5>
        </Grid>
      </Grid>
      <Divider />
      <br/>
      <Grid container justify="center">
        <Button variant="contained"><Link to="/tsumugi">Editor</Link></Button>
      </Grid>
    </Layout>
  )
}

export default IndexPage
