// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { main } from '@/backend'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  await main({
    query: req.query.q as string,
    start: req.query.start as string,
    onComplete: function (data: any): void {
      //res.setHeader('Cache-Control', 'max-age=180000'); 
      res.status(200).json(data)
    },
    onError: function (error: any): void { 
      res.status(505).json(error)
    }
  })


}
