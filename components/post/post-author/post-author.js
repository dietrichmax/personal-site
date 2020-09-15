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
`

const AuthorName = styled.a`
  font-weight: bold;
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

export default function Author({ author }) {

  const {username, picture, bio , socials} = author

  return (
    <AuthorWrapper>
      <AuthorImg
        src={`${picture.url.startsWith('/') ? process.env.API_URL : ''}${picture.url}`}
        alt={username}
        title={username}
      />
      <AuthorMeta>
        <p>Von{' '}<AuthorName>{username}{' '}</AuthorName>| {bio}</p>
        
        <AuthorSocials>
          {socials.map((social, i) => (
            <SocialIcon key={i} url={social.link} bgColor="var(--gray-light)" fgColor="var(--gray)" title={social.plattform} style={{ height: 23, width: 23, marginRight: 'var(--space-sm)' }}/>
          ))}
        </AuthorSocials>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
