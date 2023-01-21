import Link from "next/link"
import styled from "styled-components"
import media from "styled-media-query"
import Image from "next/legacy/image"
import RecipeBody from "src/components/note/note-body/note-body"
import config from "src/data/internal/SiteConfig"
import { parseISO, format } from "date-fns"
const slugify = require("slugify")
import HCard from "src/components/microformats/h-card"
import { Card } from "@/styles/templates/card"

const RecipeContainer = styled.div`
  display: flex;
  padding: 0.5rem 1rem 0 1rem;
`

const DescriptionWrapper = styled.div`
  padding: 0 var(--space-sm);
  width: 50%;
`

const ImageWrapper = styled.div`
  width: 50%;
`

const Title = styled.h2`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const SubLine = styled.p`
  font-size: 0.75rem;
`

const Meta = styled.div`
  margin-top: auto;
  padding-bottom: var(--space-sm);
`

const Duration = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
`

export default function RecipePreview({ recipe }) {
  return (
    <Card title={recipe.title} className="h-recipe">
      <Link href={`/recipes/${recipe.slug}`} passHref legacyBehavior>
        <RecipeContainer>
          <ImageWrapper>
            {recipe.coverImage ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`}
                className="u-photo"
                width="360"
                height="140"
              />
            ) : null}
          </ImageWrapper>
          <DescriptionWrapper>
            <Title className="p-name">{recipe.title}</Title>
            <HCard />
            <SubLine>{recipe.subtitle}</SubLine>
            <Meta>
              <Duration className="dt-duration">{recipe.duration} min</Duration>
            </Meta>
          </DescriptionWrapper>
        </RecipeContainer>
      </Link>
    </Card>
  )
}
