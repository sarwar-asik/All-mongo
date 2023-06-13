/* eslint-disable no-console */

import ApiError from '../../../errors/ApiError';
import { IPaginationOPtion } from '../../../interfaces/IPagination';
import { AcademicSemester } from './AcademicSemesterModel';
import { academicSemesterTittleCodeMapper } from './academicSemester.const';
import { IAcademicSemester } from './academicSemister.interace';
import httpStatus from 'http-status';

const createAcademicSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // console.log('paylod', payload);

  if (academicSemesterTittleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};




const GetPaginationSemesterService =(paginationOption:IPaginationOPtion) =>{

  return paginationOption

}




export const academicSemesterService = { createAcademicSemesterService ,GetPaginationSemesterService};
