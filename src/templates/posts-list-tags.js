import React from 'react';
import { graphql } from 'gatsby';
import PostItem from '../components/Articles/PostItem';
import TitlePage from '../components/TitlePage';
import SEO from '../components/SEO/seo';
import config from "../../data/SiteConfig";
import Pagination from '../components/Pagination';

import * as S from '../components/ListWrapper/styled';
import { Helmet } from 'react-helmet' 

const Blog = props => {
  const postList = props.data.allMdx.edges;

  // Logic for Pagination Component
  const { currentPage, numPages, category, tag, locale } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const tagslug = tag.toLowerCase()
  const prevPage =
    currentPage - 1 === 1 ? `tags/${tagslug}` : `tags/${tagslug}/${currentPage - 1}`;
  const nextPage = `tags/${tagslug}/${currentPage + 1}`;

  const title = tag
  return (
    <>
      <SEO lang={locale} />
      <Helmet>
        <title>{`${tag} | ${config.siteTitle}`}</title>
      </Helmet>
      <S.TagListing >
        <S.ListWrapper>
          {postList.map(
            ({
              node: {
                frontmatter: {
                  category,
                  date,
                  description,
                  title,
                  image,
                  layout,
                },
                timeToRead,
                fields: { slug },
              },
            }) => (
              <PostItem
                slug={`/${slug}`}
                category={category}
                date={date}
                timeToRead={timeToRead}
                title={title}
                description={description}
                image={image}
                layout={layout}
              />
            ),
          )}
        </S.ListWrapper>
      </S.TagListing>

      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  );
};

export const query = graphql`
  query PostsListTags($tag: String!, $locale: String!, $dateFormat: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}, 
      filter: { 
        fields: { locale: { eq: $locale } } 
        frontmatter: { tags: { in: [$tag] } } 
      }
      limit: $limit
      skip: $skip
    ){
      edges {
        node {
          frontmatter {
            layout
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 360, maxHeight: 300) {
                      src
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            category {
              id
              color
              description
            }
            tags
            date(formatString: $dateFormat)

          }
          timeToRead
          fields {
            locale
            slug
          }
        }
      }
    }
  }
`;

export default Blog;
