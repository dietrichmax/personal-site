import styled from "styled-components"
import media from "styled-media-query"

const Title = styled.h1`
  margin: var(--space-sm) auto var(--space) 0;
  font-size: 3rem;
  font-weight: 700;
  ${media.lessThan("large")`
    font-size: 2rem;
  `}
`

interface PostTitle {
  children: React.ReactNode
}

export default function PostTitle({ children }: PostTitle) {
  return <Title className="p-name">{children}</Title>
}
