import React, { useEffect } from "react"
import styled from "styled-components"
const prism = require("prismjs")
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
require("prismjs/components/prism-python")
require("prismjs/plugins/line-numbers/prism-line-numbers.js")
require("prismjs/plugins/show-language/prism-show-language.js")
//require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const Container = styled.div``

export default function Layout({ children, color }) {
  useEffect(() => {
    prism.highlightAll()
  }, [])

  return (
    <>
      <Header color={color} />
      <Container className="line-numbers">{children}</Container>
      <Footer />
    </>
  )
}
