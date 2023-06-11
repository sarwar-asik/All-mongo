import express from 'express'
import { userController } from './user.controller'
import validateRequest from '../../middlesWare/validateUserRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
'/create-user',
validateRequest(UserValidation.createUserZodSchema),
userController.createUser
)




router.get("/",userController.getUser)

export const UserRouter = router
