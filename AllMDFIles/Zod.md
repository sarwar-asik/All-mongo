### ZOd

### Installation

            yarn add zod

### first step -1 in createUserController function before service func

            const createUserZodSchema = z.object({
                body: z.object({
                    role: z.string({
                    required_error: 'role is required',
                    }),
                    password: z.string().optional(),
                }),
             })

    await createUserZodSchema.parseAsync(req)
