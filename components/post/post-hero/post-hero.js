import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';

const HeroWrapper = styled.div`
  margin-bottom: var(--space);
  border-bottom: 1px solid var(--gray-light);
`

const CardItemWrapper = styled.section`
  height: 100%;
`;

const HeroImg = styled.div`
`;

const HeroInfo = styled.div`    
  position: relative;
  max-width: 1200px;
  margin: auto; 
`;

const HeroMeta = styled.div`  
  margin-left: var(--space); 
  bottom: 0;
  left: 0;
  position: absolute;
  padding: var(--space);
  color: #fff;
  max-width: 50rem;
  background-color: #00000054;
  border-top-right-radius: var(--space-sm);
  border-top-left-radius: var(--space-sm);
  ${media.lessThan('medium')`
    position: relative;
    width: 100%;
    color: var(--gray);
    background-color: #fff;
`}
`;

const HeroTitle = styled.h2`
  font-size: 1.2em;
  line-height: 1.35;
  margin-bottom: calc(var(--space-sm) *0.5);
  padding-bottom: calc(var(--space-sm) *0.5);
`;


const HeroDescription = styled.p`
  margin-bottom: var(--space-sm);
`;

const TagsWrapper = styled.div`
  display: block;
  margin-bottom: var(--space-sm);
`

const TagItem = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: calc(var(--space-sm)*0.5);
  border-radius: calc(var(--space-sm)*0.5);
  font-size: 13px;
  text-transform: uppercase;
  margin: calc(var(--space-sm)*0.5) var(--space-sm) calc(var(--space-sm)*0.5) 0;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${props =>
      props.color ? props.color : '#798ad0'};
  }
`

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags,
  hero,
}) {

  return (
    <HeroWrapper>
        <HeroImg>
          <CoverImage slug={slug} title={title} url={coverImage.coverImage.url} caption={coverImage.caption} hero={hero}/>
        </HeroImg>
        <HeroInfo>
          <HeroMeta>
            <HeroTitle>
              <Link as={`/blog/${slug}`} href="/blog/[slug]">
                <a title={title}>{title}</a>
              </Link>
            </HeroTitle>
            <HeroDescription>{excerpt}</HeroDescription>
            <TagsWrapper>
              {tags.map((tag, i) => (
                  <Link key={i} href={`/blog/themen/${tag.slug}`}>
                    <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
                  </Link>
              ))}
            </TagsWrapper>
          </HeroMeta>
        </HeroInfo>
    </HeroWrapper>
  )
}
