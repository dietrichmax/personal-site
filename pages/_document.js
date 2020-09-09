import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  
  render() {

    const GA_TRACKING_ID = process.env.GA_ID

    return (
      <Html lang="de">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ''${process.env.GA_ID}'', { 'anonymize_ip': true });
              `,
           }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
