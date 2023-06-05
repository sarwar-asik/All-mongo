import { Request, Response } from 'express'
import { createUserServices } from './users.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    // console.log('hitted', data)
    const result =await createUserServices(data)
    if(result){
        res.status(200).send({
            success:true,
            message:"successfully created",
            data:result
        })
    }
  } catch (error) {
    res.status(400).send({ status: 'had an error', error })
  }
}

export default { createUser }
