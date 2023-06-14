
/* eslint-disable no-console */
import {Request, RequestHandler, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { FacultyService } from './acdemicFaculty.services';
import { Faculty } from './acdemicFaculty.model';
import { IFaculty } from './acdemicFaculty.interface';



const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...Faculty } = req.body;
    // console.log(Faculty, 'from controller=================');
    const result = await FacultyService.createFacultyService(
      Faculty
    );

    if (result) {
      sendResponse(res, {
        success: true,
        message: 'successfully create Faculty',
        statusCode: 200,
        data: result,
      });
      // next();
    }
  }
);

const getAllFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = await Faculty.find();

    if (data.length > 0) {
      sendResponse(res, {
        success: true,
        message: 'successfully get Faculty',
        statusCode: 200,
        data: data,
      });
 
    } else {
      res.status(400).send({ status: false, message: 'Not found data' });
    }
  }
);

const getAllPaginationFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
   

    const paginationOptions = pick(req.query, paginationFields);

    const filters = pick(req.query, ['searchTerm']);
    // console.log(filters,"from controller",paginationOptions);

    const result = await FacultyService.GetPaginationFacultyService(
      filters,
      paginationOptions
    );
    // console.log(result);

    sendResponse<IFaculty[]>(res, {
      success: true,
      message: 'successfully get Faculty',
      statusCode: 200,
      meta: result?.meta || null ||undefined,
      data: result.data,
    });
  }
);


const getSingleFaculty =catchAsync(
  async(req:Request,res:Response)=>{
    const id = req.params.id;
    
    // console.log(req.params);
    const result = await FacultyService.GetSingleFacultyService(
      id
    )
    // console.log(result);
    sendResponse<IFaculty[]>(res, {
      success: true,
      message: 'successfully get Faculty',
      statusCode: 200,
      data: result ||undefined || null ,
    })
  }
)


const UpdateFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData =req.body
    console.log(id,updateData);

    console.log(id, 'from controller=================');

    const result = await FacultyService.updateFacultyService(
      id,
      updateData
    )


      sendResponse(res, {
        success: true,
        message: 'successfully updated Faculty',
        statusCode: 200,
        data: result,
      });

   
  }
);

const deleteSingleFaculty =catchAsync(
  async(req:Request,res:Response)=>{
    const id = req.params.id;
    
    // console.log(req.params);
    const result = await FacultyService.DeleteSingleFacultyService(
      id
     
    );
    // console.log(result);

    sendResponse<IFaculty[]>(res, {
      success: true,
      message: 'successfully Deleted Faculty',
      statusCode: 200,
      data: result ||undefined || null ,
    })
  }
)

export const FacultyController = {
  createFacultyController,
  getAllFaculty,
  getAllPaginationFaculty,
  getSingleFaculty,
  UpdateFacultyController,
  deleteSingleFaculty
};
