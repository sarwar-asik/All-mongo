
/* eslint-disable no-console */

import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericSemesterResponse } from '../../../interfaces/ICommon';
import { IPaginationOPtion } from '../../../interfaces/IPagination';
import { AcademicSemester } from './AcademicSemesterModel';
import { academicSemesterTittleCodeMapper } from './academicSemester.const';
import {
  IAcademicSemester,
  ISemesterFilter,
} from './academicSemister.interace';
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
  filters: Partial<ISemesterFilter>,
  paginationOption: Partial<IPaginationOPtion>
): Promise<IGenericSemesterResponse<IAcademicSemester[]>> => {
  // const { page = 1, limit = 10 } = paginationOption;
  // const skip = (page - 1) * limit;
  // console.log(filters,"from");
  const { searchTerm,...filtersData } = filters;

  // console.log(searchTerm,"search",filtersData);


  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  // or ///

  const searchSemesterFields =["title","code","year"]

  const andCondition =[]
  if(searchTerm){
    andCondition.push({
      $or:searchSemesterFields.map((field)=>({
       [field]:{
        $regex: searchTerm,
        $options: 'i',
       }
      }))
    })
  }



  if(Object.keys(filtersData).length){
    // console.log(Object.keys(filtersData),"new Array");
  
   andCondition.push({
    $and:Object.entries(filtersData).map(([field,value])=>({
      [field]:value
    }))
   })

  }

  // console.log(searchTerm, 'searchTerm', filters,filtersData);


  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortCondition) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition  = andCondition.length >0 ? {$and:andCondition}:{}

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .select({ title: 1, code: 1, year: 1 });
  //  console.log(result);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page: page as number,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const GetSingleSemesterService = async (
  id:string
): Promise<IAcademicSemester | null> => {

  console.log(id,"form services");
  const result = await AcademicSemester.findById(id)
  .select({ title: 1, code: 1, year: 1 });
  console.log(result);
  return result
 
};


export const academicSemesterService = {
  createAcademicSemesterService,
  GetPaginationSemesterService,
  GetSingleSemesterService
};
