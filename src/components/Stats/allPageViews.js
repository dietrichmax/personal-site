import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import useTranslations from '../useTranslations';
import styled from 'styled-components';
import { Home3 } from "styled-icons/icomoon";

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StatsTitle = styled.div`
  display: flex;
  flex-basis: 100%;
  max-width: 100%;
`;

export const StatsPage = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 80%;
  max-width: 80%;
`;
export const StatsViews = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 20%;
  max-width: 20%;
`;
export const StatsPageLink = styled.div`
  margin: 0 !important;
  outline: none;
`;





const RecentPageViews = () => {

  const { mostPopularPages } = useTranslations();

  const data = useStaticQuery(graphql`
    {
      allPageViews {
        edges {
          node {
            totalCount
            path
          }
        }
      }
    }
  `)

  return (
    <StatsWrapper>
      <StatsTitle>
        <h3>
        <strong>{mostPopularPages}</strong>
        </h3>
      </StatsTitle>

      <StatsPage>
        <h4>
          <strong>Page</strong>
        </h4>
      </StatsPage>
      <StatsViews>
        <h4 >
          <strong>Views</strong>
        </h4>
      </StatsViews>

      {data.allPageViews.edges.slice(0, 5).map((item) => (
        <>
            <StatsPage>
              <Link to={item.node.path}>
                {item.node.path}
              </Link>
            </StatsPage>
            <StatsViews>
              {item.node.totalCount}
            </StatsViews>
        </>
      ))}
    </StatsWrapper>
  )
}

export default RecentPageViews

