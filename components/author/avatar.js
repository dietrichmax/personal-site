export default function Avatar({ name, picture, bio, socials }) {
  const url = picture.url ?? picture[0].url

  console
  return (
    <div className="flex items-center">
      <img
        src={`${
          url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
        }${url}`}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
        title={name}
      />
      <span className="text-xl font-bold mr-4">{name}</span>
      <span className="text-xl ">{bio}</span>
      {socials.map((social) => (
              <p><span>{social.plattform}{' '}</span><span>{social.link}{' '}</span></p>
            ))}
    </div>
  )
}
