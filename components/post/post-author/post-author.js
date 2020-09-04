import styled from 'styled-components';
import Date from '../../date/date'        
const AuthorWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;

`
const AuthorMeta = styled.a`
  display: block;
  margin-left: 12px;
  width: 70%;
`

const AuthorName = styled.a`
  font-weight: bold;
`

const AuthorImg = styled.img`
  display: block;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const AuthorSocials = styled.div`
width: 30%;
`

export default function Author({ name, picture, bio, socials, date }) {
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
        Von{' '}<AuthorName>{name}{' '}</AuthorName>| {bio}
        <p>Veröffentlicht am <Date dateString={date} />.</p>
      </AuthorMeta>
      {/*<AuthorSocials>
        
          {socials.map((social) => (
            <p>{social.plattform}: {social.link}</p>
          ))}
          </AuthorSocials>*/}
    </AuthorWrapper>
  )
}
