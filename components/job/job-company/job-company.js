import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';

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
  font-weight: bold;
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

export default function Company({ username, picture, email }) {

  console
  return (
    <AuthorWrapper>
      <AuthorImg
        src={`${picture.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${picture}`}
        alt={username}
        title={username}
      />
      <AuthorMeta>
        <AuthorName>{username}{' '}</AuthorName>
        {email}
      </AuthorMeta>
    </AuthorWrapper>
  )
}
