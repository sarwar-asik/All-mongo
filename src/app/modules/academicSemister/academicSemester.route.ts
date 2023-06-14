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

router.get('/AllSemester', AcademicSemesterController.getAllPaginationSemester);

router.patch('/:id',
validateRequest(academicValidation.UpdateAcademicSemesterSchema),
 AcademicSemesterController.UpdateSemesterController);

router.get('/:id',AcademicSemesterController.getSingleSemester)
router.get('/', AcademicSemesterController.getAllSemester);
export const semesterRouter = router;
