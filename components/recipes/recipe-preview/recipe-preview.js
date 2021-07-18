import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Image from "next/image"
import RecipeBody from "@/components/note/note-body/note-body"
import config from "@/lib/data/internal/SiteConfig"
import { parseISO, format } from 'date-fns'
const slugify = require('slugify')
import HCard from "@/components/microformats/h-card"
import { Card } from "@/styles/templates/card"

const ImageWrapepr = styled.div`

`

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 var(--space-sm);
  height: 120px;
`

const Title = styled.h2`
`

const SubLine = styled.p`
  font-size: .75rem;
`

const Meta = styled.div`
  margin-top: auto;
  padding-bottom: var(--space-sm);
`

const Duration = styled.span`
  font-weight: 600;
  font-size: .75rem;
`

export default function RecipePreview({ recipe }) {
  return (
      <Card title={recipe.title} className="h-recipe" >
        <Link href={`/recipes/${recipe.slug}`} passHref>
          {recipe.coverImage ? 
          <Image 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe.coverImage.url}`}
            className="u-photo"
            width="360"
            height="140"
          /> : null }
          <DescriptionWrapper>
            <Title className="p-name">{recipe.title}</Title>
            <HCard/>
            <SubLine>{recipe.subtitle}</SubLine>
            <Meta>
              <Duration className="dt-duration">{recipe.duration} min</Duration>
            </Meta>
          </DescriptionWrapper>
        </Link>
      </Card >
  )
}
