### ZOd

### Installation

            yarn add zod

### first step -1 in createUserController function before service func

            const createUserZodSchema = z.object({
                body: z.object({
                    role: z.string({
                    required_error: 'role is required',
                    }),
                    password: z.string().optional(),
                }),
             })

    await createUserZodSchema.parseAsync(req)


### SYstem-2 ZOD
####  src>app>modules>users>userRoutes.ts   :::::
     router.post('/create-user',validateRequest(UserValidationcreateUserZodSchema), userController.createUser)

####  src>app>middleware>validateRequest ::::

        import { RequestHandler } from 'express'
        import {AnyZodObject} from 'zod';

        const validateRequest = (schema :AnyZodObject):RequestHandler =>async(req,res,next):Promise<void>=>{
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




####  src>app>modules>users>userValidate :::: 
    import { z } from "zod"
    const createUserZodSchema = z.object({
        body: z.object({
        role: z.string({
            required_error: 'role is required',
        }),
        password: z.string().optional(),
        }),
    })

    export const UserValidation = {
        createUserZodSchema
    }
