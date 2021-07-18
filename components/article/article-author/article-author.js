import styled from 'styled-components';
import Image from 'next/image'
import Link from 'next/link'
import config from "@/lib/data/internal/SiteConfig";

const AuthorWrapper = styled.div`
  display: flex;
  margin-top: var(--space);
  margin-bottom: var(--space);
  background-color: var(--secondary-color);
  padding: var(--space-sm);
`

const AuthorMeta = styled.div`
  display: block;
  margin-left: 12px;
  width: 100%;
`

const AuthorName = styled.span`
  font-weight: bold;
  cursor: pointer;
`

const AuthorImgWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 50px;
`

const AuthorSocials = styled.div`
`

const AuthorSocialIcons= styled.i`    
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  margin: var(--space-sm);
  color: var(--thirdy-color);
`
export default function Author({ author }) {

  const {username, picture, bio , socials} = author

  return (
    <AuthorWrapper>
      <AuthorImgWrapper>
        <Image
          src={`${picture.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${picture.url}`}
          alt={username}
          title={username}
          width="50"
          height="50"
        />
       </AuthorImgWrapper>
      <AuthorMeta>
        <p>By{' '}<Link href="/about-me" passHref><AuthorName title="About me" >{username}{' '}</AuthorName></Link>{/*| {bio}*/} </p>
        
        <AuthorSocials>
          <Link href={config.socials.github} passHref><AuthorSocialIcons className="lab la-github" title="GitHub"/></Link>
          <Link href={config.socials.twitter} passHref><AuthorSocialIcons className="lab la-twitter" title="Twitter"/></Link>
          <Link href="mailto:kontakt@gis-netzwerk.com" passHref><AuthorSocialIcons className="las la-envelope" title="Mail"/></Link>
          <Link href={config.socials.instagram} passHref><AuthorSocialIcons className="lab la-instagram" title="Instagram"/></Link>
          <Link href={config.siteRss} passHref><AuthorSocialIcons className="las la-rss" title="RSS"/></Link>
        </AuthorSocials>
      </AuthorMeta>
    </AuthorWrapper>
  )
}
