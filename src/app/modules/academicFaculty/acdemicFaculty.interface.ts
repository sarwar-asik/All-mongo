import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type FacultyModel = Model<IAcademicFaculty>;

export type IFacultyFilter = {
  searchTerm: string;
};
