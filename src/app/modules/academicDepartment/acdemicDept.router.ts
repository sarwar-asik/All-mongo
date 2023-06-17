import express from 'express';
import validateRequest from '../../middlesWare/validateUserRequest';
import { academicDepartmentValidation } from './acdemicDept.validation';
import { DeptController } from './acdemicDepartment.controller';


const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.createDepartmentZodSchema),
  DeptController.createDeptController
);



router.get('/All-department',DeptController.getAllPaginationDept );

router.patch('/:id',
validateRequest(academicDepartmentValidation.updateDepartmentZodSchema),
DeptController.UpdateDeptController);

//  router.delete('/:id',FacultyController.deleteSingleFaculty)

router.get('/:id',DeptController.UpdateDeptController)
router.get('/', DeptController.getAllDept)




export const DepartmentRouter = router;
