/*
import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { getPostsFromQuery } from '../../../utils/blog'
import { includes, orderBy } from 'lodash'
import ArticleCard from '../PostItem'

const SimilarArticlesComponent = ({ articles }) => (
  <section className="similar-articles">
    {articles.map((article, i) => (
      <ArticleCard {...article.article} key={i}/>
    ))}
  </section>
)

class SimilarArticlesFactory {
  constructor (articles, currentArticleSlug) {
    this.articles = articles.filter((aArticle) => aArticle.slug !== currentArticleSlug);
    this.currentArticleSlug = currentArticleSlug;
    this.maxArticles = 3;
    this.category = null;
    this.tags = []
  }

  setMaxArticles (m) {
    this.maxArticles = m;
    return this;
  }

  setCategory (aCategory) {
    this.category = aCategory;
    return this;
  }

  setTags (tagsArray) {
    this.tags = tagsArray;
    return this;
  }

  getArticles () {
    const { category, tags, articles, maxArticles } = this;
    const identityMap = {};

    function getSlug (article) {
      return article.slug;
    }

    function addToMap (article) {
      const slug = getSlug(article);

      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          article: article,
          points: 0
        }
      }
    }

    function addCategoryPoints (article, category) {
      const categoryPoints = 1;
      const slug = getSlug(article);

      if (article.category === category) {
        identityMap[slug].points += categoryPoints;
      }
    }

    function addTagsPoints (article, tags) {
      const tagPoint = 2;
      const slug = getSlug(article);
      
      article.tags.forEach((aTag) => {
        if (includes(tags, aTag)) {
          identityMap[slug].points += tagPoint;
        }
      })
    }

    function getIdentityMapAsArray () {
      return Object.keys(identityMap).map((slug) => identityMap[slug]);
    }
    
    for (let article of articles) {
      addToMap(article);
      addCategoryPoints(article, category);
      addTagsPoints(article, tags)
    }
    
    const arrayIdentityMap = getIdentityMapAsArray();
    const similarArticles = orderBy(arrayIdentityMap, ['points'], ['desc'])
    return similarArticles.splice(0, maxArticles);
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query SimilarArticles {    
        posts: allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              page: {ne: true}
            }
          }
          limit: 1000
        ) {
          edges {
            node {
              timeToRead
              fields {
                slug
              }
              frontmatter {
                title
                date
                description
                tags
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
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { category, tags, currentArticleSlug } = props;

      const articles = getPostsFromQuery(data.posts);
      const similarArticles = new SimilarArticlesFactory(articles, currentArticleSlug)
        .setMaxArticles(4)
        .setCategory(category)
        .setTags(tags)
        .getArticles()

      return (
        <SimilarArticlesComponent
          articles={similarArticles}
        />
      )
    }}
  />
)*/