import { useEffect } from "react"
import styled from "styled-components"
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
const prism = require("prismjs")
require("prismjs/components/prism-python")
require("prismjs/components/prism-json")
require("prismjs/components/prism-bash")
require("prismjs/components/prism-sql")
//require("prismjs/plugins/line-numbers/prism-line-numbers.js")
//require("prismjs/plugins/show-language/prism-show-language.js")
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
