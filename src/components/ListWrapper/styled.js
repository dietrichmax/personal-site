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
  margin: 20px auto;
  max-width: 61.8%;
  ${media.greaterThan('medium')`  
    padding: 20px 20px 0 20px;  
    `}
`

export const CategoryListing = styled.div`
  background-color: white;
  margin: 80px auto;
  max-width: 61.8%;
  ${media.greaterThan('medium')`   
    padding: 20px 20px 0 20px;  
  `}
`

export const TagListing = styled.div`
background-color: white;
margin: 80px auto;
max-width: 61.8%;
${media.greaterThan('medium')`   
  padding: 20px 20px 0 20px;  
`}
`