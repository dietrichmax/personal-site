import styled from 'styled-components';
import media from 'styled-media-query';
import Img from 'gatsby-image';
import LocalizedLink from '../LocalizedLink';

export const HeroItemWrapper = styled.section`
  ${media.greaterThan('medium')` 
    display: block;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px!important;
  `}
`;
export const HeroItemContainer = styled.div`
  height: 350px;
  margin:  auto;
  max-width: 1150px;
  transition: padding .2s
  ${media.lessThan('medium')`
  margin: 20px;
  `}

`

export const HeroItemCategoryLink = styled(LocalizedLink)`

`

export const HeroItemLink = styled(LocalizedLink)`
  text-decoration: none;
  display: block;
  margin-bottom: var(--space);
  height: 100%;
  ${media.greaterThan('small')`
  `}
`;

export const HeroItemInfoContainer = styled.div`
`

export const HeroItemImgContainer = styled.header`
  margin-top: 60px;
  background: black;
  margin-bottom: 2rem;
`

export const HeroItemImg = styled(Img)`
  max-width: 100%;
  height: 350px;
  opacity: 0.7;
  object-fit: cover;
  border-top: 3px solid ${props =>
  props.categoryColor ? props.categoryColor : "hsla(0,0%,90.2%,1)"};
}
`;


export const HeroItemInfo = styled.div`  
  padding: 2rem;
  position: absolute;
  top: 15%;
  left: 22%;
  color: #fff;
  font-size: 1.5rem;
  max-width: 50%;
  ${media.lessThan('medium')`
    top: 12%;
    left: 5%;
    color: #fff;
    font-size: 1.5rem;
    max-width: 90%;
  `}
`;

export const HeroItemTag = styled.span`
  background: ${props =>
    props.background ? props.background : 'red'};
  color: #fff;
  display: inline-block;
  width: max-content;
  text-transform: uppercase;
  padding: 1px 7px;
  letter-spacing: .15em;
  font-weight: 200;
  font-size: 1.2rem;
`;

export const HeroLayoutTag = styled.span`
  background: ${props =>
    props.layout.includes("Sponsored") || props.layout.includes("sponsored") ? 'orange' : 'none'};
  color: #fff;
  display: inline-block;
  width: max-content;
  text-transform: uppercase;
  margin-bottom: 3px;
  padding: 1px 7px;
  letter-spacing: .15em;
  font-weight: 200;
  font-size: 1.2rem;
`;

export const HeroItemDate = styled.time`
  color: #fff;
  display: block;
  font-size: 1.4rem;
  margin-bottom: var(--space-sm);
`;

export const HeroItemTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 140%;
  color: #fff;
`;

export const HeroItemDescription = styled.p`
  margin-top: var(--space-sm);
  color: #fff;
`;
