import { z } from 'zod';


const createDepartmentZodSchema = z.object({
  body: z.object({
    title:z.string({
      required_error:"Required the Title (zod)"
    }),
    academicFaculty:z.string({
      required_error:"Required the AcademicFaculty (zod)"
    }),
   
  })
})



const updateDepartmentZodSchema = z.object({
  body: z.object({
    title:z.string().optional(),
    academicFaculty:z.string().optional()
  }),
})



export const academicDepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema
};
