import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';

const AuthorWrapper = styled.div`
  display: flex;
  margin-top: var(--space);
  margin-bottom: var(--space);
`

const AuthorMeta = styled.div`
  display: block;
  margin-left: 12px;
  width: 100%;
  font-weight: 200;
`

const AuthorName = styled.a`
  font-weight: bold;
  letter-spacing: 1px;
`

const AuthorImg = styled.img`
  display: block;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: auto;
`

const AuthorSocials = styled.div`
`

export default function Author({ name, picture, bio, socials }) {
  const url = picture.url ?? picture[0].url

  console
  return (
    <AuthorWrapper>
      <AuthorImg
        src={`${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`}
        alt={name}
        title={name}
      />
      <AuthorMeta>
        <p>Von{' '}<AuthorName>{name}{' '}</AuthorName>| {bio}</p>
        
        <AuthorSocials>
          {socials.map((social, i) => (
            <SocialIcon key={i} url={social.link} bgColor="var(--gray-light)" fgColor="var(--gray)" title={social.plattform} style={{ height: 23, width: 23, marginRight: 'var(--space-sm)' }}/>
          ))}
        </AuthorSocials>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
