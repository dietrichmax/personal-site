import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';

const Card = styled.div`
  margin-bottom: var(--space);
`

const CardItemWrapper = styled.section`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.2);
  border-radius: 0.75rem;
  height: 100%;
`;

const CardItemImg = styled.div`
`;

const CardItemInfo = styled.div`
  padding: var(--space-sm) var(--space);
  position: relative;
`;

const CardItemTitle = styled.h2`
  font-size: 2rem;
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
  margin-bottom: var(--space-sm);
`;

const TagsWrapper = styled.a`
  display: block;
  margin-bottom: var(--space-sm);
`

const TagItem = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  text-transform: uppercase;
  margin: 15px 10px 5px 0;
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
              <a>{title}</a>
            </Link>
          </CardItemTitle>
          <CardItemDate>
            <Date dateString={date} />
          </CardItemDate>
          <CardItemDescription>{excerpt}</CardItemDescription>
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
