import styled from 'styled-components';
import Link from 'next/link'

const AuthorWrapper = styled.div`
  display: flex;
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--gray-light);
`
const AuthorMeta = styled.a`
  display: block;
  margin-left: 12px;
  width: 100%;
`

const AuthorName = styled.a`
`

const AuthorImg = styled.img`
  display: block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-bottom: auto;
`

const AuthorSocials = styled.p`
`

export default function Company({ name, logo, url }) {

  console
  return (
    <AuthorWrapper>
      <AuthorImg
        src={`${logo.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${logo}`}
        alt={name}
        title={name}
      />
      <AuthorMeta>
        <AuthorName>
          <Link href={url}>
            <a title={name}>{name}</a>
          </Link>
        </AuthorName>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
