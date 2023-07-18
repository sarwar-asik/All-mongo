import express from 'express'


import validateRequest from '../../middlesWare/validateUserRequest'
import { AuthValidation } from './auth.validation'
import { authController } from './auth.controller'
import { UserValidation } from '../users/user.validation'
import { createUserAuthController } from './signup.controller'


const router = express.Router()

router.post(
    '/signup',
    validateRequest(UserValidation.createUserZodSchema),
    createUserAuthController
  )
router.post(
'/login',
validateRequest(AuthValidation.createUserZodSchema),
authController.loginController
)

router.post(
'/refresh-token',
validateRequest(AuthValidation.refreshTokenZodSchema),
authController.refreshTokenController
)



// router.get("/",userController.getUser)

export const AuthRouter = router
