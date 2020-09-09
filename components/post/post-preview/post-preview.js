import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';

const Card = styled.div`
  margin-bottom: var(--space);
  border: 1px solid var(--gray-light);
  border-radius: 0.75rem;
  background-color: #fff;
`

const CardItemWrapper = styled.section`
  height: 100%;
`;

const CardItemImg = styled.div`
`;

const CardItemInfo = styled.div`
  position: relative;
  padding: var(--space);
`;

const CardItemTitle = styled.h2`
  color: rgb(62, 69, 76);
  font-size: 1.2em;
  line-height: 1.35;
  margin-bottom: calc(var(--space-sm) *0.5);
  :hover {
    color: var(--primary-color);
  }
`;

const CardItemDate = styled.p`
  font-size: 1.4rem;
  margin-bottom: calc(var(--space-sm) *0.5);
`;

const CardItemDescription = styled.p`
color: rgb(62, 69, 76);
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
  author,
  slug,
  tags,
  afterPost,
}) {
  return (
    <Card>
      <CardItemWrapper>
        <CardItemImg>
          <CoverImage slug={slug} title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
        </CardItemImg>
        <CardItemInfo>
          <CardItemTitle>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a title={title}>{title}</a>
            </Link>
          </CardItemTitle>
          <CardItemDate>
            <Date dateString={date} />
          </CardItemDate>
          {afterPost ? null : <CardItemDescription>{excerpt}</CardItemDescription> }
          <TagsWrapper>
            {tags.map((tag, i) => (
                <Link key={i} href={`/blog/themen/${tag.slug}`}>
                  <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
                </Link>
            ))}
          </TagsWrapper>
        </CardItemInfo>
      </CardItemWrapper>
    </Card>
  )
}
