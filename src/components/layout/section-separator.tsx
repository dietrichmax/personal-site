import styled from "styled-components"

const Separator = styled.div`
  margin-top: var(--space);
  margin-bottom: var(--space);
  border-bottom: 1px solid var(--gray-light);
`

export default function SectionSeparator() {
  return <Separator />
}
