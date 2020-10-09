import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(
          <App {...props} />
      )
    )

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }
  
  render() {
    return (
      <Html>
        <Head>
          {this.props.styleTags}
          <link data-react-helmet="true" rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
