import styled from 'styled-components';
import Date from '../../date/date'        
const AuthorWrapper = styled.div`
  display: block;
  margin-top: 1rem;

`
const AuthorName = styled.div`
  font-weight: bold;
`

export default function Author({ name, picture, bio, socials, date }) {
  const url = picture.url ?? picture[0].url

  console
  return (
    <AuthorWrapper>
      <div className="flex items-center">
        <img
          src={`${
            url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
          }${url}`}
          className="w-12 h-12 rounded-full mr-4"
          alt={name}
          title={name}
        />
        Von<AuthorName>{' '}{name}{' '}</AuthorName>
        Veröffentlicht am{' '}<Date dateString={date} />
        {/*<span>{bio}</span>
        {socials.map((social) => (
          <p>{social.plattform}: {social.link}</p>
        ))}*/}
      </div>
    </AuthorWrapper>
  )
}
