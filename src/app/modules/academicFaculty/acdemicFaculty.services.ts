
/* eslint-disable no-console */

import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericSemesterResponse } from '../../../interfaces/ICommon';

import { IPaginationOPtion } from '../../../interfaces/IPagination';


import { IAcademicFaculty, IFacultyFilter } from './acdemicFaculty.interface';
import { Faculty } from './acdemicFaculty.model';

const createFacultyService = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  // console.log('paylod', payload);
  const result = await Faculty.create(payload);
  return result;
};

const GetPaginationFacultyService = async (
  filters: Partial<IFacultyFilter>,
  paginationOption: Partial<IPaginationOPtion>
): Promise<IGenericSemesterResponse<IAcademicFaculty[]>> => {

  const { searchTerm} = filters;

  console.log(searchTerm,"search");


  const andCondition = [
    {
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        }
       
      ],
    },
  ];




  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortCondition) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition  = searchTerm ? {$and:andCondition}:{}
  console.log(whereCondition,"where",searchTerm);

  const result = await Faculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  
  //  console.log(result);
  const total = await Faculty.countDocuments();
  return {
    meta: {
      page: page as number,
      limit: limit,
      total: total,
    },
    data: result,
  };
};


const GetSingleFacultyService = async (
  id:string
): Promise<IAcademicFaculty | null> => {

  console.log(id,"form services");
  const result = await Faculty.findById(id)
  .select({ title: 1, code: 1, year: 1 });
  console.log(result);
  return result
 
};



const updateFacultyService = async (
  id :string,
  payload:Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  


  const result = await Faculty.findByIdAndUpdate(id,payload,{new:true})

  return result;
};


const DeleteSingleFacultyService = async (
  id:string
): Promise<IAcademicFaculty | null> => {

  // console.log(id,"form services");
  const result = await Faculty.findByIdAndDelete(id)
  .select({ title: 1, code: 1, year: 1 });
  // console.log(result);
  return result
 
};

export const FacultyService = {
  createFacultyService,
  GetPaginationFacultyService,
  GetSingleFacultyService,
  updateFacultyService,
  DeleteSingleFacultyService
};
