import React from "react"
import { useScrollYPosition } from "react-use-scroll-position"
import { useWindowSize } from "../../../utils/customHooks"
import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from 'styled-components';
import media from 'styled-media-query';
import useTranslations from '../../useTranslations';

export const ArticleToc = styled.div`    
  padding: 10px 15px 10px;
  border-bottom: solid 2px rgba(10, 10, 10, 0.1);
  margin: auto auto 3rem;
  
  ${media.lessThan('medium')`
    float: none;
    border-left: none;
    max-width: 100%;
  `}
`
export const ToCHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px !important;
  margin-top: 0px !important;
`
export const ToCItem = styled.a`
`
export const ToCContent = styled.li`
  font-size: 14px;
  color: #848d95;
  margin: 10px 0px !important;
  ul {
    margin-left: 0px;
    padding-bottom: 0px;
    list-style-type: none;
    margin-bottom: 0px !important;
  }
  li {
    margin: 0 !important;
  }
  li:before {
    margin: 5px 0 5px 0;
    line-height: 1.2;
  }
  a {
    color: rgb(85, 85, 85);
    display: inline-block;
    font-weight: 700;
    transition: color 0.2s ease 0s;
    ${media.lessThan('medium')`
      margin: 2px 0 2px 0;
  `}
  }
`
export default ({ tableOfContents, currentHeading }) => {
  const size = useWindowSize()
  const scrollY = useScrollYPosition()
  if (!tableOfContents.items) {
    return <div />
  } 

const { TableofContents } = useTranslations();


  
  const Contents = ({ items, color }) => {
    return (
      <ul>
        {items.map((item) => (
          <ToCContent>
            <AnchorLink offset="30" href={item.url}>
              <ToCItem>
                {item.title}
              </ToCItem>
            </AnchorLink>
            {item.items && <Contents items={item.items} />}
          </ToCContent>
        ))}
      </ul>
    )
  }

  return (
    <ArticleToc>
        <div>
            <ToCHeader>
                {" "}
            {TableofContents}
            </ToCHeader>
        </div>
        <Contents items={tableOfContents.items} />
    </ArticleToc>
  )
}