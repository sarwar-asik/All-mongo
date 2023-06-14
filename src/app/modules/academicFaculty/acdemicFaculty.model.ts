import { Schema, model } from 'mongoose';
import {
  FacultyModel,
  IFaculty,
} from '../academicFaculty/acdemicFaculty.interface';

const FacultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
