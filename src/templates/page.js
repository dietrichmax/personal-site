import React from 'react';
import { graphql } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/SEO/seo';
import { Helmet } from 'react-helmet' 
import * as S from '../components/Content/styled';
import config from "../../data/SiteConfig";
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from 'styled-components';
import ReadingProgress from "../components/Articles/ReadingProgress/ReadingProgress.js"

export const PageWrapper = styled.div`
  margin-top: 80px;
`

const Page = props => {
  const { pageContext } = props;
  const { slug, locale } = pageContext;
  const page = props.data.mdx;

  const target = React.createRef()


  return (
    <>
        <SEO postNode={page} lang={locale} />
        <PageWrapper ref={target}>
          <ReadingProgress target={target}/>
          <TitlePage text={page.frontmatter.title} />
          <S.Content >
            <MDXRenderer>{page.body}</MDXRenderer>
          </S.Content>
        </PageWrapper>
    </>
  );
};

export const query = graphql`
  query Page($locale: String!, $title: String!) {
    mdx(
      frontmatter: { title: { eq: $title }, layout: {in: ["page"]} }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        layout
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 350) {
                  src
                  ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`;

export default Page;
