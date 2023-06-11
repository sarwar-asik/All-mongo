import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterMonth, AcademicSemesterTitles } from './academicSemester.const';

const createUserAcademicSemesterSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string,...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...AcademicSemesterCode] as [string,...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
      {
        required_error: 'Start month is required',
      }
    ),
    endMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
      {
        required_error: 'Start month is required',
      }
    ),
  }),
});

export const academicValidation = {
  createUserAcademicSemesterSchema,
};
