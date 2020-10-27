import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';

const HeroWrapper = styled.div`
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
  margin: var(--space-sm) var(--space) 0 var(--space); 
  bottom: 0;
  left: 0;
  position: absolute;
  padding: var(--space);
  color: #fff;
  max-width: 60rem;
  background-color: #00000054;
  border-top-right-radius: var(--space-sm);
  border-top-left-radius: var(--space-sm);
  ${media.lessThan('medium')`
    position: relative;
    color: var(--gray);
    max-width: 100%;
    background-color: #fff;
    padding: 0;
`}
`;

const HeroTitle = styled.h2`
  font-size: 1.2em;
  line-height: 1.35;
  margin-bottom: calc(var(--space-sm) *0.5);
  padding-bottom: calc(var(--space-sm) *0.5);
  ${media.lessThan('medium')`
    border-bottom: 1px solid var(--gray-light);
    position: relative;
    color: var(--gray);
    max-width: 100%;
    background-color: #fff;
    padding-bottom: calc(var(--space-sm) *0.5);
`}
`;

const HeroDate = styled.div`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: calc(var(--space-sm) *0.5);
  ${media.lessThan('medium')`
    color: var(--gray);
`}
`;

const HeroDescription = styled.p`
  margin-bottom: var(--space-sm);
`;

const TagsWrapper = styled.div`
  display: block;
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
`
const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-size: 1.3rem;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin: calc(var(--space-sm)*0.5);
  background-color: var(--primary-color);
  border-radius: var(--space-sm);
  :hover {
    background-color: ${props =>
      props.color ? props.color : '#798ad0'};
    color: white;
  }
`
export default function PostHero({heroData, hero}) {

  const { title, coverImage, date, excerpt, slug, tags } = heroData
  return (
    <HeroWrapper>
        <HeroImg>
          <CoverImage slug={slug} title={title} url={coverImage.coverImage.url} hero={hero}/>
        </HeroImg>
        <HeroInfo>
          <HeroMeta>
            <HeroTitle>
              <Link as={`/articles/${slug}`} href="/articles/[slug]">
                <a title={title}>{title}</a>
              </Link>
            </HeroTitle>
            
          <HeroDate>
            <Date dateString={date} />
          </HeroDate>
            <HeroDescription>{excerpt}</HeroDescription>
            <TagsWrapper>
              {tags.map((tag, i) => (
                  <Link key={i} href={`/articles/topics/${tag.slug}`}>
                    <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
                  </Link>
              ))}
            </TagsWrapper>
          </HeroMeta>
        </HeroInfo>
    </HeroWrapper>
  )
}
