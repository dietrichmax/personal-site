import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import Link from 'next/link'


export default function Error({ statusCode }) {

  return (
    <Layout>
      <Header />
  
      <SEO   
        title="500 - Error"
        slug=""
      />
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      
      <Footer />
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
