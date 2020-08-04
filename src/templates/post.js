import React, { useState, useEffect, useRef } from "react"
import { graphql } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/SEO/seo';
import styled from 'styled-components';
import media from 'styled-media-query';
import * as S from '../components/Content/styled';
import { Link } from 'gatsby';
import licence from '../utils/licence';
import useTranslations from '../components/useTranslations';
import PostCover from '../components/Articles/PostCover';
import { Helmet } from 'react-helmet' 
import config from "../../data/SiteConfig";
import { MDXRenderer } from "gatsby-plugin-mdx"
import ViewCounter from "../components/Articles/ViewCounter/ViewCounter.js"
import Like from "../components/Articles/PostReactions/Likes.js"
import ReadingProgress from "../components/Articles/ReadingProgress/ReadingProgress.js"
import A1 from "../components/Ads/GoogleAdManager/A1.js"
import RIWAAd from "../components/Ads/RIWA/mobileVermessung/index.js"
import TableOfContents from "../components/Articles/TableofContents/TableofContents.js"
import AuthorBox from "../components/Articles/PostAuthor/"
//import SimilarArticles from '../components/Articles/RelatedPosts/SimilarArticles.js'
import SocialShare from "../components/Articles/SocialShare/SocialShare.js";
import Subscribe from "../components/Newsletter/Subscribe.js"
import Cookies from 'js-cookie'
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

export const MetaElement = styled.div`
  text-align: center;
`

export const MetaElementWrapper = styled.div`
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
  margin-top: var(--space-sm);
`
export const CategoryElement = styled.a`
  text-decoration: none;
  font-weight: 200;
  color: white;
  padding: 5px 10px;
  font-size: 1.25rem;
  text-transform: uppercase;
  :hover {
    color: white;
    text-decoration: none;
  }
`

export const PostCoverCaption = styled.p`
  position: relative;
  float: right;
  padding-right: 12px;
  text-transform: uppercase;
  color: rgb(85,85,85);
  font-size: 10px;
`

export const DateElement = styled.div`    
  color: rgb(108, 117, 125);
  font-size: 1.2rem;
  margin-top: 8px;
`
export const ViewCounterWrapper = styled.div`    
color: rgb(108, 117, 125);
font-size: 1.4em;
margin-top: 8px;
`;


const Post = props => {
  const { pageContext } = props;
  const { slug, locale } = pageContext;
  const post = props.data.mdx;
  let localeslug;

  locale === "de" ? localeslug = "" : localeslug = "/en";


  const target = React.createRef()
  const [currentHeading, setCurrentHeading] = useState("")

  const categoryMeta = post.frontmatter.category;
  const tagsMeta = post.frontmatter.tags;

  const categorySlug = `${localeslug}/${categoryMeta.id.toLowerCase()}`;
  
  const licenceName = licence(post.frontmatter.caption)[0];
  const licenceLink = licence(post.frontmatter.caption)[1];
  const newCaption = licence(post.frontmatter.caption)[2];

  const author = post.frontmatter.author

  useEffect(() => {
    if (post.tableOfContents.items) {
      setCurrentHeading(post.tableOfContents.items[0].title)
    }
  }, [])
  function onChange(isVisible, name) {
    if (isVisible) {
      setCurrentHeading(name)
    }
  }

  const {
    imageSource,
    toRead,
  } = useTranslations();
  
  
      
  // get value of Cookie "consent"
  const consentGiven = Cookies.get('consent')

  return (
    <>
    <div ref={target}>
      <SEO postPath={slug} postNode={post} postSEO lang={locale}/>
      <ReadingProgress target={target} color={categoryMeta.color}/>
      <PostCover image={post.frontmatter.image} title={post.frontmatter.title} />
      <PostCoverCaption >{imageSource} {newCaption} <a href={licenceLink}>{licenceName}</a></PostCoverCaption>
      <TitlePage text={post.frontmatter.title} />

      <MetaElement>   
        <MetaElementWrapper>{post.frontmatter.date} • <ViewCounter id={slug} increment/> • {post.timeToRead} min {toRead}</MetaElementWrapper>
        <Link to={categorySlug} alt={categoryMeta.id} title={categoryMeta.id}>
          <CategoryElement style={{backgroundColor: `${categoryMeta.color}`}}>{categoryMeta.id}</CategoryElement>
        </Link> 
      </MetaElement>

        <TableOfContents
          tableOfContents={post.tableOfContents}
          currentHeading={currentHeading}
        />
        
        {/*{consentGiven ? <A1/> : categoryMeta.id === "GIS" && locale != "en" ? <RIWAAd/> : null }*/}
        <A1/>
        <S.Content color={categoryMeta.color}>
          <MDXRenderer>{post.body}</MDXRenderer>
          <S.SocialContainer>
            <Like id={slug}/>
            <SocialShare postPath={slug} postNode={post}/>
          </S.SocialContainer>
          <AuthorBox authorMeta={post.frontmatter.author}/>
          <Subscribe color={categoryMeta.color} />
          {/*<JoinAudience />
          <SimilarArticles category={categoryMeta.id} tags={tagsMeta} currentArticleSlug={slug} />*/}
      </S.Content>
      </div>
    </>
  );
};

export const query = graphql`
  query Post($locale: String!, $title: String!) {
    mdx(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        date
        category {
          id
          color
        }
        tags
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 350) {
                  src
                  ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        caption
        author {
          id
          bio
          profilepicture {
            childImageSharp {
              fixed(width: 60, height: 60) {
                    src
                    ...GatsbyImageSharpFixed_withWebp_noBase64
              }
            }
          }
          socials {
            twitter
            github
            linkedin
            instagram
          }
        }
      }
      body
      tableOfContents
      timeToRead
    }
  }
`;

export default Post ;