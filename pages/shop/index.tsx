import Layout from "@/src/components/layout/layout"
import { getAllLinks } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"
import Grid from "@/src/components/grid/grid"
import ProductPreview from "@/components/products/productPreview"

const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: var(--width-container);
`

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Cup",
      description: "Personalize your cup",
      image: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/samantha_ram_Ha5_Jc_Y_Arf0_unsplash_7d627ef41c.jpg?`,
      colors: ["red", "blue"],
      sizes: ["medium"],
      ratings: [],
      price: 1.99,
    },
  ]

  return (
    <>
      <Layout>
        <SEO title="Shop" slug="shop" description="" />
        <PageTitle>Shop</PageTitle>
        <SubTitle>Shop Subtitle</SubTitle>
        <LinksContainer>
          <Grid>
            {products.map((product) => (
              <ProductPreview product={product} />
            ))}
          </Grid>
        </LinksContainer>
      </Layout>
    </>
  )
}
