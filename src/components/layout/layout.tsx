import styled from "styled-components"
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"

const Container = styled.div``

interface Layout {
  children: React.ReactNode
  color?: string
}

export default function Layout({ children, color }: Layout) {
  return (
    <>
      <Header color={color} />
      <Container className="line-numbers">{children}</Container>
      <Footer />
    </>
  )
}
