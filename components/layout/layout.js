import Container from './container'
import Prism from "Prismjs";
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
