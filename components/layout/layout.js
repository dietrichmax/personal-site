import Container from './container'
import React,  { useEffect } from "react"
const prism = require("prismjs")
require('prismjs/components/prism-python');

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
