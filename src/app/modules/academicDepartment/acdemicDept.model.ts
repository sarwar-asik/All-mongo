import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './acdemicDept.interface';

const FacultySchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartment = model<IDepartment, DepartmentModel>(
  'AcademicDepartment',
  FacultySchema
);
