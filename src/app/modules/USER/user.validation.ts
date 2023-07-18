import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    phoneNumber: z.string({
      required_error: 'PhoneNumber is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    name: z.object({
      firstName: z.string(),
      lastName: z.string().optional(),
    }),
  }),
});



const updateUserZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: 'role is required',
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'PhoneNumber is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z.string(),
        lastName: z.string().optional(),
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};