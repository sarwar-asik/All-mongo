import { Model } from 'mongoose';


export type IFaculty = {
  title: string;
};


export type FacultyModel = Model<IFaculty>;


export type IFacultyFilter ={
  searchTerm:string
}