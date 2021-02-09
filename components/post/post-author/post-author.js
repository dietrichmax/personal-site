import styled from 'styled-components';
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

const AuthorImgWrapper = styled(Image)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`

const AuthorSocials = styled.div`
`

export default function Author({ author }) {

  const {username, picture, bio , socials} = author

  return (
    <AuthorWrapper>
      <AuthorImgWrapper>
        <AuthorImg
          src={`${picture.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${picture.url}`}
          alt={username}
          title={username}
          width="50"
          height="50"
        />
       </AuthorImgWrapper>
      <AuthorMeta>
        <p>By{' '}<AuthorName>{username}{' '}</AuthorName>| {bio}</p>
        
        <AuthorSocials>
          {/*{socials.map((social, i) => (
            <SocialIcon key={i} url={social.link} bgColor="var(--primary-color)" fgColor="var(--text-color)" title={social.plattform} style={{ height: 23, width: 23, marginRight: 'var(--space-sm)' }}/>
          ))}*/}
        </AuthorSocials>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
