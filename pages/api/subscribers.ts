import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    console.log(req.body)
    const requestOptions = {
        method: "POST",
        headers: req.headers,
        body: req.body
    }
  
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/subscribers`, requestOptions)
        .then(function (response) {
          if (!response.ok) {
            res.status(500).json({response})
          } else {
            res.status(200).json({response})
          }
        })
        .catch(function (error) {
          console.log(error)
        })

        
}