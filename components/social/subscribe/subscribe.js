import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig"
import { format, subDays, formatDistance} from 'date-fns'
import Newsletter from '@/components/social/newsletter/subscribe'

const Container = styled.div`
  background-color: var(--primary-color);
  width: 100%;
`

export default function Connect({post}) {

    
  return (
    <Container>
      <p>Do you want to know when i am posting  new {post}?</p>
      <p>You can subscribe to the {post}-feed or join the newsletter</p>
    </Container>
  )
}