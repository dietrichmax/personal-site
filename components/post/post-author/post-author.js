import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image'

const AuthorWrapper = styled.div`
  display: flex;
  margin-top: var(--space);
  margin-bottom: var(--space);
`

const AuthorMeta = styled.div`
  display: block;
  margin-left: 12px;
  width: 100%;
`

const AuthorName = styled.span`
  font-weight: bold;
`

const AuthorImg = styled(Image)`
  border-radius: 50%;
  margin-bottom: auto;
`

const AuthorSocials = styled.div`
`

export default function Author({ author }) {

  const {username, picture, bio , socials} = author

  return (
    <AuthorWrapper>
      <AuthorImg
        src={`${picture.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${picture.url}`}
        alt={username}
        title={username}
        width="55"
        height="50"
      />
      <AuthorMeta>
        <p>By{' '}<AuthorName>{username}{' '}</AuthorName>| {bio}</p>
        
        <AuthorSocials>
          {socials.map((social, i) => (
            <SocialIcon key={i} url={social.link} bgColor="var(--primary-color)" fgColor="var(--text-color)" title={social.plattform} style={{ height: 23, width: 23, marginRight: 'var(--space-sm)' }}/>
          ))}
        </AuthorSocials>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
