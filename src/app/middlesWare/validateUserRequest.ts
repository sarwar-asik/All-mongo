import { RequestHandler } from 'express'
import {AnyZodObject, ZodEffects} from 'zod';



// eslint-disable-next-line no-unused-vars
const validateRequest = (schema :AnyZodObject | ZodEffects<AnyZodObject>):RequestHandler =>async(req,res,next):Promise<void>=>{
    try {
        await schema.parseAsync({
            body:req.body,
            query:req.query,
            params:req.params,
            cookies:req.cookies
        })
        return next()

      } catch (error) {
        // res.status(400).send({ status: 'had an error in createUser', error })
        next(error)
      }
}


export default validateRequest