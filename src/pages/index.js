import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO/seo';
import PostItem from '../components/Articles/PostItem';
import TitlePage from '../components/TitlePage';
import LocalizedLink from '../components/LocalizedLink';
import useTranslations from '../components/useTranslations';
import styled from 'styled-components';
import * as S from '../components/ListWrapper/styled';
import HeroItem from '../components/HeroItem';
import config from "../../data/SiteConfig";
import { Helmet } from 'react-helmet' 
import Subscribe from "../components/Newsletter/Subscribe.js"

export const Subline = styled.div`
  text-align: center !important;
`
const Index = ({ data: { allMdx, HeroImg}, locale }) => {


  
  
  const { home } = useTranslations();

  const postList = allMdx.edges;
  const heroimg = HeroImg.edges;
  
  return (
    <div className="homepage" >
      <SEO lang={locale} />
      <Helmet>
        <title>{`${home} | ${config.siteTitle}`}</title>
        <link rel="canonical" href={`${config.siteUrl}`} />
      </Helmet>
        {heroimg.map(
            ({
              node: {
                frontmatter: {
                  layout,
                  category,
                  date,
                  description,
                  title,
                  image
                },
                timeToRead,
                fields: { slug, locale },
              },
            }) => (
                <HeroItem
                  slug={`${slug}`}
                  locale={locale}
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
        
        <S.IndexListing>
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
                  fields: { slug, locale },
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
                    locale={locale}
                  />
                ),
            )}
          </S.ListWrapper>

        <br />
      </S.IndexListing>
     {/*} <Subscribe style={{margin:'auto'}} color="var(--text-dark)" />*/}
    </div>
  );
};

export default Index;

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!, ) {
    allMdx(
      filter: {
        fields: { locale: { eq: $locale } }
        fileAbsolutePath: {regex: "/(content/posts)\/.*\\.md$/"}
      }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 1
      limit: 12
    ) {
      edges {
        node {
          frontmatter {
            layout
            title
            description
            category {
              id
              color
            }
            image {
              childImageSharp {
                fluid(maxWidth: 360, maxHeight: 300) {
                      src
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
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
    HeroImg:
    allMdx(
      filter: {
        fields: { locale: { eq: $locale } }
        fileAbsolutePath: {regex: "/(content/posts)\/.*\\.md$/"}
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            layout
            title
            description
            category {
              id
              color
            }
            image {
              childImageSharp {
                fluid(maxWidth: 1920, maxHeight: 350) {
                      src
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
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
