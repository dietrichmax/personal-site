
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import Link from 'next/link'
import Newsletter from '@/components/social/newsletter/subscribe'

export default function MailingList() {
  return (
  <>
    <SEO   
      title="Mailing List"
      slug="mailinglist"
    />
    <Layout>
      <Header/>
      <Title>Mailing List</Title>

      <Newsletter />
      
      <Footer />
    </Layout>
  </>
  )
}
