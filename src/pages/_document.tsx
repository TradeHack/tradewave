import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets as MuiServerStyleSheets } from '@material-ui/styles';



class MyDocument extends Document {
  // @ts-ignore
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const muiSheet = new MuiServerStyleSheets()
    // @ts-ignore
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    )
    // @ts-ignore
    const pageMui = renderPage((App) => (props) =>
        muiSheet.collect(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    return { ...page, ...pageMui, styleTags }
  }


  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta name='robots' content='all' key='robots' />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            {/*// @ts-ignore*/}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
