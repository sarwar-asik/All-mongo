import express from 'express'
import userController from './users.controller'
import usersController from './users.controller'
const router = express.Router()

router.post('/create-user', userController.createUser)
router.get("/",usersController.getUser)

export default router
