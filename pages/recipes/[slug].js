import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllRecipes, getRecipe } from '@/lib/data/api/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import RecipeContent from "@/components/post/post-body/post-body"
import Title from "@/components/title/post-title"
import Webmentions from "@/components/social/webmentions/webmentions"
import Link from"next/link"
import Image from "next/image" 

const RecipeWrapper = styled.div`
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: 0 auto var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const RecipeImage = styled.div`
  margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  position: relative;
  box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  position: relative;
  object-fit: cover;
  max-width: 1300px;
  height: 450px;
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--border-radius);
`
const TitleWrapper = styled.div`
  max-width: var(--width-container);
  margin: auto;
  padding: 0 var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const SubLine = styled.p`
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
`


const Ingredients = styled.ul`
  padding-inline-start: 1rem;
`

const Ingredient = styled.li``


const SubTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`



export default function Recipe({ recipe }) {
  const router = useRouter()

  return (
    <Layout>
        {router.isFallback ? (
          <Title>{config.loading}</Title>
        ) : (
          <>  
              <Link href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`} aria-label={recipe.title} passHref>
                <RecipeImage>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`}
                    alt={recipe.title} 
                    title={recipe.title} 
                    width="1300"
                    height="450"
                  /> 
                </RecipeImage>
              </Link>
              <TitleWrapper><Title>{recipe.title}</Title></TitleWrapper>
              <RecipeWrapper>
              <SubLine>{recipe.subtitle}</SubLine>
                Overall {recipe.duration} min preparation time.
                <SubTitle>Ingredients</SubTitle>
                <Ingredients>
                  {recipe.ingredients.map((ingredient,i) => {
                    return (
                      <Ingredient key={i}>{ingredient.amount} {ingredient.ingredient}</Ingredient>
                    )
                  })}
                </Ingredients>
                <SubTitle>Preparation</SubTitle>
                <RecipeContent content={recipe.description}/>
                <Webmentions slug={`/recipes/${recipe.slug}`} />
              </RecipeWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {  
  const data = await getRecipe(params.slug)
  
  return {
    props: {
      recipe: {  
        ...data?.recipes[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const recipes = await getAllRecipes()

  return {
    paths: recipes.recipes?.map((recipe) => `/recipes/${recipe.slug}`) || [],
    fallback: true,
  }
}
