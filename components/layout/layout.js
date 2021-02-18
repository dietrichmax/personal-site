import React,  { useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
const prism = require("prismjs")
require('prismjs/components/prism-python');
import ReactTooltip from 'react-tooltip';

const Container = styled.div`
`

const StyledTooltip = styled(ReactTooltip)`
  background-color: var(--gray-extra-light);
  color: var(--primary-color);
`



export default function Layout({ children }) {
  
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <>
      <ReactTooltip />
      <Container>{children}</Container>
    </>
  )
}
