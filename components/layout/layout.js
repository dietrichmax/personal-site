import React,  { useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
const prism = require("prismjs")
import "@/styles/prism.css"
require('prismjs/components/prism-python');

const Container = styled.div`
`

export default function Layout({ children }) {
  
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <>
      <Container>{children}</Container>
    </>
  )
}
