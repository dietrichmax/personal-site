import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import Newsletter from '@/components/social/newsletter/subscribe'

export default function MailingList() {
  return (
  <>
    <SEO   
      title="Mailing List"
      slug="mailinglist"
    />
    <Layout>
      <Title>Mailing List</Title>

      <Newsletter />
      
    </Layout>
  </>
  )
}
