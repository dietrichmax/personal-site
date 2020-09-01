import styled from 'styled-components';
import media from 'styled-media-query';

const ContainerWrapper = styled.div`
  max-width: 1140px;
  margin: auto;
`

export default function Container({ children }) {


  return (
    <>
      <ContainerWrapper>
        {children}
      </ContainerWrapper>
    </>
  )
}
