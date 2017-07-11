import React from 'react'
import Helmet from 'react-helmet'

import { prefixLink } from 'gatsby-helpers'

const BUILD_TIME = new Date().getTime()

export default class extends React.Component {
  render () {
    const head = Helmet.rewind()

    let css
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,700" rel="stylesheet" />
          {css}
        </head>
        <body>
            <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
            <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    )
  }
}
