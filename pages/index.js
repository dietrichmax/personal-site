import PostPreview from '@/components/post/post-preview/post-preview'
import NotePreview from "@/components/note/note-preview/note-preview"
import LinkPreview from "@/components/link/link-preview/link-preview"
import Layout from '@/components/layout/layout'
import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls, getAllRecipes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import { useRouter } from 'next/router'
import server from "@/lib/utils/server"

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px; 
  margin: var(--space) auto;
`

const HeroWrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: var(--primary-color);
`
const Hero = styled.div`   
  display: flex;
  color: var(--thirdy-color);
  max-width: 1200px;
  padding: calc(3rem + 120px) 0 calc(3rem + 120px) 0;
  margin: 0 auto;
  ${media.lessThan('medium')`
  padding: calc(1rem + 120px) 0 calc(1rem + 60px) 0;
    width: 100%;
  `}
`

const HeroDescription = styled.h3`
  color: var(--gray-light);
  margin: 0 var(--space);
  font-size: calc(.9rem + 2vw);
  font-weight: 300;
  line-height: 1.15;
  font-family: var(--thirdy-font);
  ${media.lessThan('small')`
    font-size: 1.5em;
  `}
  ${media.lessThan('medium')`
    margin: 0 var(--space-sm);
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  border-bottom: 2px solid var(--thirdy-color);
  color: var(--thirdy-color);
  font-family: var(--primary-font);
`

const HeroFont = styled.span`
  font-family: var(--primary-font);
  font-weight: 600;
  color: var(--thirdy-color);
`
const SubTitle = styled.p`
  margin: var(--space) var(--space) var(--space-sm) var(--space);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  ${media.lessThan('medium')`
    margin: var(--space-sm);
  `}
`

const Grid = styled.ol`
  max-width: 1200px;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space);
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1,minmax(0,1fr));
  `}
`



export default function Index({ allContent }) {
  const router = useRouter()

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <>
      <Layout color={`var(--gray-extra-light)`}>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Home"
              description={config.siteDescription}
            />
             <HeroWrapper>
              <Hero>
                <HeroDescription>
                <HeroFont>Hi, I’m </HeroFont><HeroLinks href={config.socials.mail}title={config.siteTitle}>Max Dietrich</HeroLinks>, GeoData Manager and Web-Developer from Rosenheim, Germany. <br/>
                  I am also a proud member of the <HeroLinks href="https://indieweb.org/" title="IndieWeb">IndieWeb</HeroLinks> community.
                </HeroDescription>
              </Hero>
            </HeroWrapper>
            <IndexPageContainer>
              <Grid>
                {sortedContent.map((content,i) => (
                  content.type === "article" ? (
                    <PostPreview
                      key={i}
                      postData={content}
                    />
                  ) : content.type === "note" ? (
                    <NotePreview 
                      key={i}
                      note={content} 
                    />
                ) : content.type === "link" ? (
                  <LinkPreview
                    key={i}
                    link={content} 
                  />
              ) : null
                ))}
              </Grid>


              {/*<SubTitle>Recent Notes</SubTitle>
              <NotesContainer >
                {notes.map((note) => (
                 <NotePreview note={note} />
                ))}
                
              </NotesContainer>
              <MoreContainer>
                <Link href={`/notes`} passHref>
                  <MoreArticles title="All Notes">All Notes{' '}</MoreArticles>
                </Link>
                </MoreContainer>*/}
            </IndexPageContainer>

          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allRecipes = (await getAllRecipes()) || []

  const res = await fetch(`${server}/api/posts`)
  const data = await res.json()
  console.log(data)
  
  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      title: post.title,
      slug: post.slug,
      date: post.date,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags,
      type: "article"
    })
  })


  allNotes.map((note) => {
    allContent.push({
      id: note.id,
      title: note.title,
      slug: note.id,
      coverMedium: note.coverMedium,
      date: note.date,
      content: note.content,
      category: note.category,
      ofUrl: note.ofUrl,
      syndicationLinks: note.syndicationLinks,
      type: "note"
    })
  })

  allLinks.map((link) => {
    allContent.push({
      title: link.title,
      slug: `${link.link}`,
      date: link.date,
      description: link.description,
      link: link.link,
      tags: link.tags,
      type: "link"
    })
  })
  
  /*recipes.map((recipe) => {
    allContent.push({
      title: recipe.title,
      slug: `${config.siteUrl}/recipes/${recipe.slug}`,
      date: recipe.created_at,
      content: recipe.description
    })
  })*/

  return {
    revalidate:  86400,
    props: { allPosts, allNotes, allContent },
  }
}

