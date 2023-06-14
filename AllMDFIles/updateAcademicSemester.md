## Update Academic-Semester ////  *** You can not update without title and code info  
                localhost//:5000/semester/6489e1dfdd06295a71aa95c9  


###   create a router src>App>modules>academicSemester>academicSemester.router.ts ::::
        router.patch('/:id',
            validateRequest(academicValidation.UpdateAcademicSemesterSchema),
            AcademicSemesterController.UpdateSemesterController
            );
###   create a validation for validate code and title src>App>modules>academicSemester.validation.ts :::

    const UpdateAcademicSemesterSchema = z.object({
    body: z.object({
        title: z.enum([...AcademicSemesterTitles] as [string,...string[]], {
        required_error: 'Title is required',
        }).optional(),
        year: z.string({
        required_error: 'Year is required',
        }).optional(),
        code: z.enum([...AcademicSemesterCode] as [string,...string[]], {
        required_error: 'Code is required',
        }).optional(),
        startMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
        {
            required_error: 'Start month is required',
        }
        ).optional(),
        endMonth: z.enum([...AcademicSemesterMonth] as [string,...string[]],
        {
            required_error: 'Start month is required',
        }
        ).optional(),
    }),
    }).refine((data)=>(data.body.title && data.body.code)|| (!data.body.title && !data.body.code),{
    message:"You Should provide title and code both not You can not update(zod vai) "
    })


###   change validation Type for remove type error from router src>App>middleware   :::

    const validateRequest = (schema :AnyZodObject | ZodEffects<AnyZodObject>):RequestHandler =>async(req,res,next):Promise<void>=>{
        try {
            await schema.parseAsync({
                body:req.body,
                query:req.query,
                params:req.params,
                cookies:req.cookies
            })
            return next()

        } catch (error) {
            // res.status(400).send({ status: 'had an error in createUser', error })
            next(error)
        }
    }



###   create a controller src>App>modules>academicSemester>academicSemesterController  ::::

        
    const UpdateSemesterController = catchAsync(
      async (req: Request, res: Response) => {
        const id = req.params.id
        const updateData =req.body
 

        // console.log(academicSemester, 'from controller=================');

        const result = await academicSemesterService.updateAcademicSemesterService(id,updateData)


        sendResponse(res, {
            success: true,
            message: 'successfully create semester',
            statusCode: 200,
            data: result,
        });
        // next();
    
    }
    )

###   create a router src>App>modules>academicSemester>academicSemesterServices ::::
                            
            const updateAcademicSemesterService = async ( id :string, payload:Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {
            

            if (payload.title && payload.code && academicSemesterTittleCodeMapper[payload.title] !== payload.code) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
            }


            const result = await AcademicSemester.findByIdAndUpdate(id,payload,{new:true})

            return result;
            };