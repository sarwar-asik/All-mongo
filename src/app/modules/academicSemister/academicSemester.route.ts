import express from 'express'
import validateRequest from '../../middlesWare/validateUserRequest'
import { academicValidation } from './academicSemester.validation'


const router = express.Router()

router.post(
'/create-user',
validateRequest(academicValidation.createUserAcademicSemesterSchema),
// userController.createUser
)




// router.get("/",userController.getUser)

export const UserRouter = router
