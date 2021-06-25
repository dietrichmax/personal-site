import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllRecipes, getRecipe } from '@/lib/data/api/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import RecipeContent from "@/components/article/article-body/article-body"
import Title from "@/components/title/post-title"
import Webmentions from "@/components/social/webmentions/webmentions"
import Link from"next/link"
import Image from "next/image" 
import HCard from "@/components/microformats/h-card"
import WebActions from "@/components/social/feedback/feedback"

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
  position: relative;
  object-fit: cover;
  max-width: 1300px;
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

const Duration = styled.time``
const Yield = styled.data``

export default function Recipe({ recipe }) {
  const router = useRouter()

  return (
    <Layout>
        {router.isFallback ? (
          <Title>{config.loading}</Title>
        ) : (
          <>
          <SEO   
            title={recipe.title}
            description={recipe.description}
            slug={`recipes/${recipe.slug}`}
          />
          <div className="h-recipe">             
            <HCard /> 
            <Link href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`} aria-label={recipe.title} passHref>
                <RecipeImage>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`}
                    alt={recipe.title} 
                    title={recipe.title} 
                    className="u-photo"
                    width="1300"
                    height="450"
                  /> 
                </RecipeImage>
              </Link>
              <TitleWrapper><Title className="p-name">{recipe.title}</Title></TitleWrapper>
              <RecipeWrapper>    
              <SubLine>{recipe.subtitle}</SubLine>
              <p>Takes overall <Duration className="dt-duration" datetime={`${recipe.duration}MIN`}>{recipe.duration}</Duration> min preparation time 
              and serves <Yield className="p-yield" value={recipe.yield}>{recipe.yield}</Yield> people.
                <SubTitle>Ingredients</SubTitle></p>
                <Ingredients>
                  {recipe.ingredients.map((ingredient,i) => {
                    return (
                      <Ingredient className="p-ingredient" key={i}>{ingredient.amount} {ingredient.ingredient}</Ingredient>
                    )
                  })}
                </Ingredients>
                <SubTitle>Preparation</SubTitle>
                <RecipeContent className="e-instructions" content={recipe.description}/>
                <WebActions slug={`/recipes/${recipe.slug}`} />
                <Webmentions slug={`/recipes/${recipe.slug}`} />
              </RecipeWrapper>
          </div>
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
