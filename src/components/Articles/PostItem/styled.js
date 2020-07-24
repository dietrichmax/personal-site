import styled from 'styled-components';
import media from 'styled-media-query';
import Img from 'gatsby-image';
import LocalizedLink from '../../LocalizedLink';

export const PostItemLink = styled(LocalizedLink)`
  text-decoration: none;
  display: block;
  margin-bottom: var(--space);
  height: 100%;
  ${media.greaterThan('small')`
  `}
`;

export const PostItemWrapper = styled.section`
  border: 1px solid #d9d9d9!important;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  margin: auto;
  overflow: hidden;
  -webkit-transition: all .35s ease;
  transition: all .35s ease;
  height: 100%;    
  width: 90%;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,.5);
    -webkit-transform: translateY(-10px) scale(1);
    transform: translateY(-10px) scale(1);
  }
  border-radius: 0.75rem;
  ${media.greaterThan('small')` 
    width: 100%;
    margin: auto;
  `}
`;

// export const PostItemImg = styled.img`
//   display: block;
// `

export const PostItemImg = styled(Img)`
  width: 100%;
  height: 300px;
`;

export const PostItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: calc(var(--space) * 1.5) var(--space);
  position: relative;
`;

export const PostImageItemWrapper = styled.div`    
  box-sizing: border-box;
`


export const PostItemLayoutInfo = styled.span`    
  position: absolute;   
  z-index: 2;
  margin: 10px 0 0 20px;
  color: hsla(0,0%,100%,.8);
  text-transform: uppercase;
  line-height: 1;
  font-family: Arial,sans-serif;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: .3rem;
`

export const PostItemTag = styled.span`
  background: ${props =>
    props.background ? props.background : 'red'};    
  - webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  position: absolute;
  top: 0;
  left: 20px;
  color: #fff;
  display: inline-table;
  width: -webkit-max-content;
  width: max-content;
  text-transform: uppercase;
  padding: 3px 8px;
  letter-spacing: .2em;
  font-weight: 200;
  font-size: 1.2rem;
`;

export const PostItemDate = styled.time`
  font-size: 1.4rem;
  margin-bottom: var(--space-sm);
`;

export const PostItemTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 140%;
`;

export const PostItemDescription = styled.p`
  margin-top: var(--space-sm);
`;
