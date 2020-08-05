import styled from 'styled-components';
import media from 'styled-media-query';

export const ListWrapper = styled.section`
  ${media.greaterThan('small')`
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}
  ${media.greaterThan('medium')`
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}
`;

export const IndexListing = styled.div`
  background-color: white;
  margin: 0 auto;
  ${media.greaterThan('medium')`  
    padding: 0 20px 0 20px;  
    max-width: 61.8%;
    `}
`

export const CategoryListing = styled.div`
  background-color: white;
  margin: 80px auto;
  ${media.greaterThan('medium')`   
    padding: 20px 20px 0 20px;  
    max-width: 61.8%;
  `}
`

export const TagListing = styled.div`
background-color: white;
margin: 80px auto;
${media.greaterThan('medium')`   
  max-width: 61.8%;
  padding: 20px 20px 0 20px;  
`}
`
