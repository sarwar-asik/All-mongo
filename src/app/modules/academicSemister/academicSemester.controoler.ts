/* eslint-disable no-console */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { academicSemesterService } from './academicSemesterServices';
import { AcademicSemester } from './AcademicSemesterModel';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const { ...academicSemester } = req.body;
    // console.log(academicSemester, 'from controller=================');
    const result = await academicSemesterService.createAcademicSemesterService(
      academicSemester
    )
    
    if (result) {
     sendResponse(res,{success:true,message:"successfully create semester",statusCode:200,data:result})
     next()
    }
  }
);

const getAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const data = await AcademicSemester.find();
    if (data.length > 0) {
      sendResponse(res,{success:true,message:"successfully get semester",statusCode:200,data:data})
      next()
    } else {
      res.status(400).send({ status: false, message: 'Not found data' });
    }
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
};
