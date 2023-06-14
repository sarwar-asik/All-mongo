import { IAcademicSemester } from './academicSemister.interace';
/* eslint-disable no-console */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { academicSemesterService } from './academicSemesterServices';
import { AcademicSemester } from './AcademicSemesterModel';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;
    // console.log(academicSemester, 'from controller=================');
    const result = await academicSemesterService.createAcademicSemesterService(
      academicSemester
    );

    if (result) {
      sendResponse(res, {
        success: true,
        message: 'successfully create semester',
        statusCode: 200,
        data: result,
      });
      // next();
    }
  }
);

const getAllSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await AcademicSemester.find();

    if (data.length > 0) {
      sendResponse(res, {
        success: true,
        message: 'successfully get semester',
        statusCode: 200,
        data: data,
      });
      // next();
    } else {
      res.status(400).send({ status: false, message: 'Not found data' });
    }
  }
);

const getAllPaginationSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const paginationOption={
    //   page:Number( req.query.page),
    //   limit:Number(req.query.limit),
    //   sortBy:req.query.sortBy,
    //   sortOrder:req.query.sortOrder,
    // }

    //   *** system-1  ***///

    //   const finalObj:any = {}
    //       for (const key of paginationFields) {
    //         if (req.query && Object.hasOwnProperty.call(req.query, key)) {
    //           // console.log(Object.hasOwnProperty.call(obj, key));

    //           finalObj[key] = req.query[key];
    //         }
    //       }
    //       // console.log(finalObj,"form connnnnnnnn");
    //  const result1 = await academicSemesterService.GetPaginationSemesterService(finalObj)

    //   *** system-2  ***///


    const paginationOptions = pick(req.query, paginationFields);

    const filters =  pick(req.query,  ["searchTerm"]);
    // console.log(filters,"from controller",paginationOptions);

    const result = await academicSemesterService.GetPaginationSemesterService(
      filters,
      paginationOptions,
  
    );
    // console.log(result);

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      message: 'successfully get semester',
      statusCode: 200,
      meta: result?.meta || null,
      data: result.data,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getAllPaginationSemester,
};
