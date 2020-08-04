import styled from 'styled-components';
import media from 'styled-media-query';
import Img from 'gatsby-image';
import LocalizedLink from '../../LocalizedLink';

export const CategoryHeroContainer = styled.div`    
    margin-top: 60px;
    padding-bottom: 40px;
    width: 100%;
    background-color: ${props =>
        props.categoryColor ? props.categoryColor : "hsla(0,0%,90.2%,1)"};
`;

export const CategoryHeroTitle = styled.div`
    padding-top: 2rem;

`;
export const CategoryHeroDescription = styled.div`
    max-width: 1000px;
    margin: 2rem auto 0;
    text-align: center;
    font-weight: 400;
    padding: .5rem;
    line-height: 1.2;
    font-size: 1.5rem;
    ${media.greaterThan('medium')`
        line-height: 1.1;
        font-size: 2.5rem;
    `}

    ${media.greaterThan('large')`
        line-height: 1.1;
        font-size: 3rem;
    `}

`;
