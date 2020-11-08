import PropTypes from 'prop-types'
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  },
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
