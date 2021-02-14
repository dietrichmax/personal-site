
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import Link from 'next/link'

export default function Custom404() {
  return (
  <>
    <SEO   
      title="404 - Page not found"
      slug=""
    />
    <Layout>
      <Header/>
      <Title>404 - Page Not Found</Title>
      
      <Link href="/">
        <a>
          Go back home
        </a>
      </Link>

      <Footer />
    </Layout>
  </>
  )
}
