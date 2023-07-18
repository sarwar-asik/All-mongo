import { z } from "zod"





const LoginZodSchema = z.object({
  body: z.object({
    phoneNumber:z.string({
    required_error:"phoneNumber is required"
   }),
  password:z.string({
    required_error:"Password is required"
   }),
  }),
});


const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required (zod)',
    }),
  }),
});



  export const AuthValidation = {
    createUserZodSchema: LoginZodSchema,
    refreshTokenZodSchema
  }
