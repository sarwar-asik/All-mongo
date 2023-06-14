
## Dynamic Filtering with pagination >>>


        localhost/:5000//semester/AllSemester/?searchTerm=aut
        localhost/:5000/semester/AllSemester/?title=Autumn&year=2022



#### create modules>AcademicSemester>AcademicSemesterController ::::
            const getAllPaginationSemester: RequestHandler = catchAsync(
        async (req: Request, res: Response) => {
            // const paginationOption={
            //   page:Number( req.query.page),
            //   limit:Number(req.query.limit),
            //   sortBy:req.query.sortBy,
            //   sortOrder:req.query.sortOrder,
            // }

            //   *** system-1  ***///

            //   const finalObj:any = {}
            //       for (const key of paginationFields) {
            //         if (req.query && Object.hasOwnProperty.call(req.query, key)) {
            //           // console.log(Object.hasOwnProperty.call(obj, key));

            //           finalObj[key] = req.query[key];
            //         }
            //       }
            //       // console.log(finalObj,"form connnnnnnnn");
            //  const result1 = await academicSemesterService.GetPaginationSemesterService(finalObj)

            //   *** system-2  ***///


            const paginationOptions = pick(req.query, paginationFields);

            const filters =  pick(req.query,  ["searchTerm","title",'code','year']);
            // console.log(filters,"from controller",paginationOptions);

            const result = await academicSemesterService.GetPaginationSemesterService(
            filters,
            paginationOptions,
        
            );
            // console.log(result);

            sendResponse<IAcademicSemester[]>(res, {
            success: true,
            message: 'successfully get semester',
            statusCode: 200,
            meta: result?.meta || null,
            data: result.data,
            });
        }
        );


#### create modules>AcademicSemester>AcademicSemesterService :::::


            const GetPaginationSemesterService = async (filters: Partial<ISemesterFilter>, paginationOption: Partial<IPaginationOPtion>): Promise<IGenericSemesterResponse<IAcademicSemester[]>> => {
                    // const { page = 1, limit = 10 } = paginationOption;
                    // const skip = (page - 1) * limit;
                    // console.log(filters,"from");
            const { searchTerm,...filtersData } = filters;

            // console.log(searchTerm,"search",filtersData);


            // const andCondition = [
            //   {
            //     $or: [
            //       {
            //         title: {
            //           $regex: searchTerm,
            //           $options: 'i',
            //         },
            //       },
            //       {
            //         code: {
            //           $regex: searchTerm,
            //           $options: 'i',
            //         },
            //       },
            //       {
            //         year: {
            //           $regex: searchTerm,
            //           $options: 'i',
            //         },
            //       },
            //     ],
            //   },
            // ];

            // or ///

    const searchSemesterFields =["title","code","year"]

    const andCondition =[]
        if(searchTerm){
            andCondition.push({
            $or:searchSemesterFields.map((field)=>({
            [field]:{
                $regex: searchTerm,
                $options: 'i',
            }
            }))
            })
        }



    if(Object.keys(filtersData).length){
        // console.log(Object.keys(filtersData),"new Array");
    
    andCondition.push({
        $and:Object.entries(filtersData).map(([field,value])=>({
        [field]:value
        }))
    })

    }

    


    const { page, limit, skip, sortBy, sortOrder } =
        calculatePagination(paginationOption);

    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortCondition) {
        sortCondition[sortBy] = sortOrder;
    }

    
    const whereCondition  = andCondition.length >0 ? {$and:andCondition}:{}

    const result = await AcademicSemester.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .select({ title: 1, code: 1, year: 1 });
    const total = await AcademicSemester.countDocuments();
    return {
        meta: {
        page: page as number,
        limit: limit,
        total: total,
        },
        data: result,
    };
    };
