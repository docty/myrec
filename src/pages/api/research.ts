// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { main } from '@/backend'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
 
  main({
    query:  req.query.q as string,
    start: req.query.start as string,
    onComplete: function (data: any): void { 
      res.status(200).json(data)
    }
})

  
}
