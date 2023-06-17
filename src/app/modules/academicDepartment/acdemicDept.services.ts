/* eslint-disable no-console */

import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericSemesterResponse } from '../../../interfaces/ICommon';

import { IPaginationOPtion } from '../../../interfaces/IPagination';
import { IDepartment, IDepartmentFilter } from './acdemicDept.interface';
import { AcademicDepartment } from './acdemicDept.model';

const createDeptService = async (
  payload: IDepartment
): Promise<IDepartment> => {
  console.log('paylod in create depart', payload);
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const GetPaginationDeptService = async (
  filters: Partial<IDepartmentFilter>,
  paginationOption: Partial<IPaginationOPtion>
): Promise<IGenericSemesterResponse<IDepartment[]>> => {
  // console.log('filters',filters, "paginationOptions",paginationOption);

  // const {limit,skip,sortOrder,sortBy} = calculatePagination(paginationOption)

  const helpers = calculatePagination(paginationOption);

  console.log(helpers, 'helpers');

  const { searchTerm, ...filterData } = filters;

  console.log(filterData, 'filterData', searchTerm, 'sarchterm');

  const andCondition = [];

  const academicSearchFields = ['title'];

  if (searchTerm) {
    andCondition.push({
      $or: academicSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // console.log(searchTerm, 'search');

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortCondition) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = searchTerm ? { $and: andCondition } : {};
  // console.log(whereCondition, 'where', searchTerm);

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  //  console.log(result);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page: page as number,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const GetSingleDeptService = async (
  id: string
): Promise<IDepartment | null> => {
  console.log(id, 'form services');
  const result = await AcademicDepartment.findById(id).select({
    title: 1,
    code: 1,
    year: 1,
  });
  console.log(result);
  return result;
};

const updateDeptService = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const DeleteSingleDeptService = async (
  id: string
): Promise<IDepartment | null> => {
  // console.log(id,"form services");
  const result = await AcademicDepartment.findByIdAndDelete(id).select({
    title: 1,
    code: 1,
    year: 1,
  });
  // console.log(result);
  return result;
};

export const DeptService = {
  createDeptService,
  GetPaginationDeptService,
  GetSingleDeptService,
  updateDeptService,
  DeleteSingleDeptService,
};
