import styled from "styled-components"
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"

const Container = styled.div``

export default function Layout({ children, color }) {
  return (
    <>
      <Header color={color} />
      <Container className="line-numbers">{children}</Container>
      <Footer />
    </>
  )
}
