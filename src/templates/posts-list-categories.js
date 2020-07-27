import React from 'react';
import { graphql } from 'gatsby';
import PostItem from '../components/Articles/PostItem';
import TitlePage from '../components/TitlePage';
import SEO from '../components/SEO/seo';
import HeroItem from '../components/HeroItem';
import { Helmet } from 'react-helmet' 
import Pagination from '../components/Pagination';
import config from "../../data/SiteConfig";
import * as S from '../components/ListWrapper/styled';
import LocalizedLink from '../components/LocalizedLink';

const Blog = props => {
  const postList = props.data.allMdx.edges;
  // Logic for Pagination Component
  const { currentPage, numPages, category, locale} = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const categoryslug = category.toLowerCase()
  const prevPage =
    currentPage - 1 === 1 ? `/${categoryslug}` : `/${categoryslug}/${currentPage - 1}`;
  const nextPage = `/${categoryslug}/${currentPage + 1}`;


  return (
    <>
      <SEO lang={locale} />
      <Helmet >
        <title>{`${category} | ${config.siteTitle}`}</title>
      </Helmet >
        <S.CategoryListing >
          <S.ListWrapper>
            {postList.map(
              ({
                node: {
                  frontmatter: {
                    layout,
                    category,
                    date,
                    description,
                    title,
                    image,
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

          <Pagination
            isFirst={isFirst}
            isLast={isLast}
            currentPage={currentPage}
            numPages={numPages}
            prevPage={prevPage}
            nextPage={nextPage}
          />
          </S.CategoryListing>
        </>
  );
};

export const query = graphql`
  query PostsListCategories($category: String!, $locale: String!, $dateFormat: String!, $limit: Int!, $skip: Int!) {
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}, 
      filter: { 
        fields: { locale: { eq: $locale } } 
        frontmatter: {category: {id: {eq: $category } } }
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
