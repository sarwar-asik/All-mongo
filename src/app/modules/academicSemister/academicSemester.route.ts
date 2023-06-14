import express from 'express';
import validateRequest from '../../middlesWare/validateUserRequest';
import { academicValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controoler';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicValidation.createUserAcademicSemesterSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/:id',AcademicSemesterController.getSingleSemester)
router.get('/', AcademicSemesterController.getAllSemester);
router.get('/AllSemester', AcademicSemesterController.getAllPaginationSemester);
export const semesterRouter = router;
