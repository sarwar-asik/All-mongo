import { z } from 'zod';


const createFacultySchema = z.object({
  body: z.object({
    title:z.string({
      required_error:"Required the Title (zod)"
    }),
   
  }),
});


// const UpdateAcademicSemesterSchema = z.object({
//   body: z.object({
//     title: z.enum([...AcademicSemesterTitles] as [string,...string[]], {
//       required_error: 'Title is required',
//     }).optional(),
//     year: z.string({
//       required_error: 'Year is required',
//     }).optional(),
//     code: z.enum([...AcademicSemesterCode] as [string,...string[]], {
//       required_error: 'Code is required',
//     }).optional(),
//     startMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
//       {
//         required_error: 'Start month is required',
//       }
//     ).optional(),
//     endMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
//       {
//         required_error: 'Start month is required',
//       }
//     ).optional(),
//   }),
// }).refine((data)=>(data.body.title && data.body.code)|| (!data.body.title && !data.body.code),{
//   message:"You Should provide title and code both not You can not update(zod vai) "
// })

export const academicFacultyValidation = {
  createFacultySchema,
  // UpdateAcademicSemesterSchema
};
