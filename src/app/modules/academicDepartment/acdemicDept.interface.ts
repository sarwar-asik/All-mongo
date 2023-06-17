import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/acdemicFaculty.interface';

export type IDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type DepartmentModel = Model<IDepartment,Record<string,unknown>>;

export type IDepartmentFilter = {
  searchTerm: string;
};
 