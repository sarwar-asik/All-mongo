import express from 'express';
import validateRequest from '../../middlesWare/validateUserRequest';
import { academicFacultyValidation } from './acdemicFaculty.validation';
import { FacultyController } from './acdemicFaculty.controller';


const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultySchema),
  FacultyController.createFacultyController
);

router.get('/All-faculty', FacultyController.getAllPaginationFaculty);

router.patch('/:id',
validateRequest(academicFacultyValidation.createFacultySchema),
FacultyController.UpdateFacultyController);

 router.delete('/:id',FacultyController.deleteSingleFaculty)

router.get('/:id',FacultyController.getSingleFaculty)
router.get('/', FacultyController.getAllFaculty);


export const facultyRouter = router;
