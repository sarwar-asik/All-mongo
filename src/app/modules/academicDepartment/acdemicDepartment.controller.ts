/* eslint-disable no-console */
import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { AcademicDepartment } from './acdemicDept.model';
import { DeptService } from './acdemicDept.services';
import { IDepartment } from './acdemicDept.interface';

// in Auth Provider :::

const createDeptController = catchAsync(async (req: Request, res: Response) => {
  const { ...deptData } = req.body;

  // console.log(Dept, 'from controller=================');
  const result = await DeptService.createDeptService(deptData);

  if (result) {
    sendResponse(res, {
      success: true,
      message: 'successfully create Dept',
      statusCode: 200,
      data: result,
    });
    // next();
  }
});

const getAllDept: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = await AcademicDepartment.find();

    if (data.length > 0) {
      sendResponse(res, {
        success: true,
        message: 'successfully get Dept',
        statusCode: 200,
        data: data,
      });
    } else {
      res.status(400).send({ status: false, message: 'Not found data' });
    }
  }
);


// {{UNV}}/department/All-department?searchTerm=Physics

const getAllPaginationDept: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.query, 'query');
    const filters = pick(req.query, ['searchTerm', 'title']);

    // console.log(paginationOptions, 'paginationOption');

    const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    // console.log(filters,"from controller",paginationOptions);

    // res.send({ message: 'Processing', data:filters });

    const result = await DeptService.GetPaginationDeptService(
      filters,
      paginationOptions
    )

    // console.log(result);
    sendResponse<IDepartment[]>(res, {
      success: true,
      message: 'successfully get Dept',
      statusCode: 200,
      meta: result?.meta || null || undefined,
      data: result.data,
    });
  }
);

const getSingleDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  // console.log(req.params);
  const result = await DeptService.GetSingleDeptService(id);
  // console.log(result);
  sendResponse<IDepartment[]>(res, {
    success: true,
    message: 'successfully get Dept',
    statusCode: 200,
    data: result || undefined || null,
  });
});

const UpdateDeptController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log(id, updateData);

  console.log(id, 'from controller=================');

  const result = await DeptService.updateDeptService(id, updateData);

  sendResponse(res, {
    success: true,
    message: 'successfully updated Dept',
    statusCode: 200,
    data: result,
  });
});

const deleteSingleDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  // console.log(req.params);
  const result = await DeptService.DeleteSingleDeptService(id);
  // console.log(result);

  sendResponse<IDepartment[]>(res, {
    success: true,
    message: 'successfully Deleted Dept',
    statusCode: 200,
    data: result || undefined || null,
  });
});

export const DeptController = {
  createDeptController,
  getAllDept,
  getAllPaginationDept,
  getSingleDept,
  UpdateDeptController,
  deleteSingleDept,
};
