import Layout from "src/components/layout/layout"
import SEO from "src/components/seo/seo"
import Title from "src/components/title/page-title"

export default function Error({ statusCode }) {
  return (
    <Layout>
      <SEO title="500 - Error" slug="" />
      <Title>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Title>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
