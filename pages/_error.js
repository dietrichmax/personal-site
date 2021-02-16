import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'


export default function Error({ statusCode }) {

  return (
    <Layout>
      <Header />
  
      <SEO   
        title="500 - Error"
        slug=""
      />
      <Title>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </Title>
      
      <Footer />
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
