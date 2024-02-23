import styled from "styled-components"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaReddit } from "@react-icons/all-files/fa/FaReddit"
import { FaStrava } from "@react-icons/all-files/fa/FaStrava"

const Meta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: var(--space-sm);
`

const DateWrapper = styled.p`
  font-size: 11px;
  :hover {
    text-decoration: underline;
  }
`

const SyndList = styled.ol`
  font-family: var(--secondary-font);
  list-style: none;
  padding-inline-start: 0;
  text-align: right;
`

const SyndLi = styled.li`
  display: inline-block;
  margin-left: 5px;
`

const SyndItem = styled.a`
  cursor: pointer;
`

export default function PostMeta({ post, slug, syndicationLinks }) {
  const getEndpoint = (name) => {
    if (name == "twitter") {
      return <FaTwitter />
    } else if (name == "instagram") {
      return <FaInstagram />
    } else if (name == "reddit") {
      return <FaReddit />
    } else if (name == "strava") {
      return <FaStrava />
    }
  }

  const dateOptions = { year: "numeric", month: "long", day: "numeric" }

  //console.log(post)
  return (
    <Meta>
      <DateWrapper className="dt-published">
        First published{" "}
        <a className="u-url" title={slug} href={slug}>
          {new Date(
            post.attributes.publishedAt
              ? post.attributes.publishedAt
              : post.attributes.createdAt
          ).toLocaleDateString("en-US", dateOptions)}
        </a>
      </DateWrapper>
      <SyndList className="syndications">
        {syndicationLinks
          ? syndicationLinks.map((link, i) => {
              return (
                <SyndLi key={i}>
                  <SyndItem
                    aria-label={link.name}
                    title={`See this post on ${link.name}`}
                    className="u-syndication syndication"
                    href={link.slug}
                    rel="u-syndication syndication no-follow"
                  >
                    {getEndpoint(link.name)}
                  </SyndItem>
                </SyndLi>
              )
            })
          : null}
      </SyndList>
    </Meta>
  )
}
