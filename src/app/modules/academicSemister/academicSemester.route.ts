import express from 'express'
import validateRequest from '../../middlesWare/validateUserRequest'
import { academicValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controoler'



const router = express.Router()

router.post(
'/create-semester',
validateRequest(academicValidation.createUserAcademicSemesterSchema),
AcademicSemesterController.createAcademicSemester
)

router.get("/",AcademicSemesterController.getAcademicSemester)


// router.get("/",userController.getUser)

export const semesterRouter = router
