/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Grid from '@material-ui/core/Grid'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={() => (
        <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
          <Header siteTitle="OI Wiki カルミナ"/>
          <div
            style={{
              margin: `0 auto`,
              // maxWidth: 960,
              // padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 80,
            }}
          >
          <main>{children}</main>
            <footer style={{ paddingTop: 10, textAlign: 'center' }}>
              © {new Date().getFullYear()}, OI Wiki Team
            </footer>
          </div>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
