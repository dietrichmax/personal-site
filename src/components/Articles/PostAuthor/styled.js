import styled from 'styled-components';
import media from 'styled-media-query';
import Img from 'gatsby-image';

export const AuthorWrapper = styled.div`
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    border-top: 3px solid hsla(0,0%,95.2%,1);
    padding: 2rem 0 0 0;
`;

export const AuthorMeta = styled.p`
    display: block;
    text-align:center;
`;

export const AuthorBio = styled.p`
    font-size: 0.9em;
    font-style: italic;
    color: var(--text-dark);
    margin: 0 !important;
`;

export const AuthorImg = styled(Img)`
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;
