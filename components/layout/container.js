import styled from 'styled-components';
import media from 'styled-media-query';

const ContainerWrapper = styled.div`

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
