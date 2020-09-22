import Container from './container'
import Prism from "prismjs";
import React,  { useEffect } from "react"

export default function Layout({ children }) {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Container>{children}</Container>
    </>
  )
}
