import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import { initGA, logPageView } from '../utils/analytics'

export default function Layout({ preview, children }) {

  /*componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }*/

  return (
    <>
      <Meta />
      <div className="">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
