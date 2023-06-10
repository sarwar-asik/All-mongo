import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/create-user',userController.createUser )
router.get("/",userController.getUser)

export const UserRouter = router
