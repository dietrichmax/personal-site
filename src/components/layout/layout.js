import React, { useEffect } from "react"
import styled from "styled-components"
const prism = require("prismjs")
import Header from "src/components/navigation/header/header"
import Footer from "src/components/navigation/footer/footer"
require("prismjs/components/prism-python")

const Container = styled.div``

export default function Layout({ children, color }) {
  useEffect(() => {
    prism.highlightAll()
  }, [])

  return (
    <>
      <Header color={color} />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
