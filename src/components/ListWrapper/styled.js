import styled from 'styled-components';
import media from 'styled-media-query';

export const ListWrapper = styled.section`
  margin-bottom: 20px;
  ${media.greaterThan('small')`
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    `}
  ${media.greaterThan('medium')`
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    `}
`;

export const IndexListing = styled.div`
  margin: 20px auto;
  max-width: 100%;
  ${media.greaterThan('medium')`   
  padding: 0 20px 0 20px;  
    `}
`

export const CategoryListing = styled.div`
  margin: 80px auto;
  max-width: 100%;
  ${media.greaterThan('medium')`   
    padding: 0 20px 0 20px;  
  `}
`

export const TagListing = styled.div`
margin: 80px auto;
max-width: 100%;
${media.greaterThan('medium')`   
  padding: 0 20px 0 20px;  
`}
`