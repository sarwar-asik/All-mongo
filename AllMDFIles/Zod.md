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

#### src>app>modules>users>userRoutes.ts :::::

     router.post('/create-user',validateRequest(UserValidationcreateUserZodSchema), userController.createUser)

#### src>app>middleware>validateRequest ::::

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

#### src>app>modules>users>userValidate ::::

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

### src>app>middleware>globalError (add the condition in the function) :::::

      else if(error instanceof ZodError){
            const simplifiedError =handleZOdError(error)
            statusCode = simplifiedError.statusCode;
            message =simplifiedError.message;
            errorMessage = simplifiedError.errorMessages;
      }

### src> app>errors>handleZOdError :::::

        import { ZodError, ZodIssue } from 'zod';
        import { IGenericResponse } from '../interfaces/ICommon';
        import { IGenericErrorMessage } from '../interfaces/Ierror';

        const handleZOdError = (error: ZodError): IGenericResponse => {
        const statusCode = 400;

        //   console.log(error, 'from handleZodError');

        const errors: IGenericErrorMessage[] = error.issues.map(
            (issue: ZodIssue)=> {
            return {
                path: issue?.path[issue.path.length-1],
                message: issue?.message,
            };
            }
        );

        return {
            statusCode,
            message: 'Validate Error from handleZodError',
            errorMessages: errors,
        };
        };

        export default handleZOdError;
