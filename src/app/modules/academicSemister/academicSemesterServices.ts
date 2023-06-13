/* eslint-disable no-console */

import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericSemesterResponse } from '../../../interfaces/ICommon';
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

const GetPaginationSemesterService = async (
  paginationOption: Partial<IPaginationOPtion>
): Promise<IGenericSemesterResponse<IAcademicSemester[]>> => {
  // const { page = 1, limit = 10 } = paginationOption;
  // const skip = (page - 1) * limit;

  const {page,limit,skip,sortBy,sortOrder} = calculatePagination(paginationOption)

  const sortCondition:{[key:string]:SortOrder} ={}

  if(sortBy && sortCondition){
    sortCondition[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find({}).sort(sortCondition).skip(skip).limit(limit);
  //  console.log(result);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page:page,
      limit:limit,
      total:total,
    },
    data: result,
  };
};

export const academicSemesterService = {
  createAcademicSemesterService,
  GetPaginationSemesterService,
};
