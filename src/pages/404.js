import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import StringSimilarity from "string-similarity"
import SEO from "../components/SEO/seo.js"
import { Emojione } from "react-emoji-render"


export default ({ location, data }) => {



  const pages = data.allSitePage.nodes.map(({ path }) => path)
  const pathname = location.pathname
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch
  
  function renderContent() {
    return result.rating > 0.4 ? (
      <>
          <h1 className="">
            Du hast wahrscheinlich nach
            <Link style={{textDecoration:'underline'}} to={result.target}>
              {result.target}
            </Link> 
            gesucht:{" "}
            
          </h1>
          <h3 className="">
            Du hast nach etwas anderem gesucht?
            Dann schau doch mal die neuesten Beiträge an.
          </h3>
        </>
      ) : (
        <>
          <h1 className="">
            Ok, du bist verloren.
          </h1>
          <h3 className="">
            Zurück nach Hause.
          </h3>
      </>
    )
  }

  return (
    <>
        <SEO title={"404"} />
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{textAlign:'center'}}>
            <div>
              <h3>
                Seite nicht gefunden <Emojione style={{display:'inline-block'}}text="😭" />
              </h3>
              {renderContent()}
              <Link
                to={"/"}
                style={{ textDecoration: "none" }}
                className=""
              >
                <button>
                  Zurück nach Hause
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
  )
}

export const pageQuery = graphql`
  {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`

