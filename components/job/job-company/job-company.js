import styled from 'styled-components';
import Link from 'next/link'
import config from "../../../data/SiteConfig";

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

const AuthorName = styled.div`
  color: var(--gray);
`

const AuthorImg = styled.img`
  display: block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: var(--space-sm);
`


export default function Company({ companyData }) {

  const { name, logo, websiteUrl } = companyData

  const logoUrl = logo.formats.logo ? logo.formats.logo.url : logo.url
  return (
    <AuthorWrapper>
      {logoUrl ? 
        <AuthorImg
          src={`${logoUrl.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${logoUrl}`}
          alt={name}
          title={name}
        /> : null }
      <AuthorName>
        <Link href={websiteUrl}>
          <a title={name}>{name}</a>
        </Link>
      </AuthorName>
    </AuthorWrapper>
  )
}
