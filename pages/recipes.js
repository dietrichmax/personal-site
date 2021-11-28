
import Layout from 'src/components/layout/layout'
import { getAllRecipes } from 'src/data/external/cms'
import config from "src/data/internal/SiteConfig";
import styled from 'styled-components';
import SEO from 'src/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from 'src/components/title/page-title'
import SubTitle from 'src/components/title/sub-title'
import Grid from 'src/components/grid/grid'
import Preview from "src/components/recipes/recipe-preview/recipe-preview"

const RecipesWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`

export default function Recipes({ allRecipes }) {
  const router = useRouter()

  
  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Recipes"
              slug="recipes"
            />
            <PageTitle>Recipes</PageTitle>
            <SubTitle> </SubTitle>
            <RecipesWrapper>

              <Grid>
                {allRecipes.map((recipe,i) => (
                  <Preview 
                    key={i}
                    recipe={recipe}
                  />
                ))}
              </Grid>

            </RecipesWrapper>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allRecipes = (await getAllRecipes()) || []

  return {
    revalidate:  86400,
    props: { 
      allRecipes: allRecipes
    },
  }
}
