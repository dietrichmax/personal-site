import Layout from 'src/components/layout/layout'
import SEO from 'src/components/seo/seo'
import Title from 'src/components/title/page-title'
import Newsletter from 'src/components/social/newsletter/subscribe'

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
