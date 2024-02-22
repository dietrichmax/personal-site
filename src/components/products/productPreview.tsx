import styled from "styled-components"
import dynamic from "next/dynamic"
import HCard from "@/src/components/microformats/h-card"
import { Card } from "@/styles/templates/card"
import Image from "next/image"
import Link from "next/link"
import media from "styled-media-query"
import { Button } from "@/styles/templates/button"

const ProductContainer = styled.div`
  position: relative;
  display: flex;
`

const ImageWrapper = styled.div`
  height: 200px;
  width: 300px;
`

const ProductInfo = styled.div`
  margin-left: var(--space);
  margin-top: var(--space-sm);
`

const ProductTitle = styled.h2`
  font-size: 2rem;
`

const ProductDescription = styled.h3`
  font-weight: 400;
`

const ProductColor = styled.div``

const ProductSize = styled.div``

const ProductPrice = styled.div``

export default function ProductPreview({ product }) {
  const slug = `/shop/products/${product.slug}`

  return (
    <Card className="h-entry">
      <ProductContainer>
        <ImageWrapper>
          <Image
            src={product.image}
            alt={product.title}
            width="300"
            height="200"
          />
        </ImageWrapper>
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductColor>{product.colors}</ProductColor>
          <ProductSize>{product.sizes}</ProductSize>
          <ProductPrice>{product.price}</ProductPrice>
          <Button>Add to Cart</Button>
        </ProductInfo>
      </ProductContainer>
    </Card>
  )
}
