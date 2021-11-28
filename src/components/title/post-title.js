import styled from "styled-components"
import media from "styled-media-query"

const Title = styled.h1`
  margin: 0 auto var(--space-sm) 0;
  font-size: 3rem;
  max-width: 900px;
  font-weight: 700;
  ${media.lessThan("medium")`
    font-size: 2rem;
`}
`
export default function PostTitle({ children }) {
  return <Title className="p-name">{children}</Title>
}
