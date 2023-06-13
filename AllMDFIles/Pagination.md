## pagination steps

#### create modules>AcademicSemester>AcademicSemesterController ::::

        const getAllPaginationSemester: RequestHandler = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

                // const paginationOption={
                //   page:Number( req.query.page),
                //   limit:Number(req.query.limit),
                //   sortBy:req.query.sortBy,
                //   sortOrder:req.query.sortOrder,
                // }

                <!-- or  -->
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

       
            const paginationOption= pick(req.query,["page","limit","sortBy","sortOrder"])
                     <!-- or  -->

            const paginationOption= pick(req.query,paginationFields)


            const result = await academicSemesterService.GetPaginationSemesterService(paginationOption)


                sendResponse(res, {
                success: true,
                message: 'successfully get semester',
                statusCode: 200,
                data: result,
                });

        }
        );


        ***Note ***   
           function getObjectKeysAsArray(obj: Record<string, any>): string[] {
                 return Object.keys(obj);
            }
            const keysArray = getObjectKeysAsArray(req.query);
           <!-- console.log(keysArray,"aaaaaa") -->
       const paginationOption= pick(req.query,keysArray)

## Create src>shared>pick > (for get {"page": "1","limit": "10"} by pick(req.query,["page","limit","sortBY","sortBY"])) ::::

       
      


     


        const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T,keys: k[]): Partial<T> => {
            console.log('sortItem', obj, keys, 'From sort');

            const finalObj: Partial<T> = {};

                for (const key of keys) {
                    if (obj && Object.hasOwnProperty.call(obj, key)) {
                    // console.log(Object.hasOwnProperty.call(obj, key));

                    finalObj[key] = ob` j[key];
                    }
                }
             //   console.log('Final object', finalObj);

             return finalObj;
        };

        export default pick;

## src>const>pagination.ts> ::::

            export const paginationFields = ["page","limit","sortBy","sortOrder"]

     

#### create modules>AcademicSemester>AcademicSemesterService :::::

                        
        const GetPaginationSemesterService = async (paginationOption: Partial<IPaginationOPtion> ): Promise<IGenericSemesterResponse<IAcademicSemester[]>> => {
                // const { page = 1, limit = 10 } = paginationOption;
                // const skip = (page - 1) * limit;

                const {page,limit,skip,sortBy,sortOrder} = calculatePagination(paginationOption)

                const sortCondition:{[key:string]:SortOrder} ={}

                if(sortBy && sortCondition){
                         sortCondition[sortBy] = sortOrder
                }

                const result = await AcademicSemester.find({}).sort(sortCondition).skip(skip).limit(limit);
                //  console.log(result);
                const total = await AcademicSemester.countDocuments();
                return {
                        meta: {
                        page:page,
                        limit:limit,
                        total:total,
                },
                data: result,
                };
        };


#### src>helper>paginationHelper.ts ::::
        import { SortOrder } from "mongoose";

        type IOptions = {
        page?: number;
        limit?: number;
        sortBy?:string;
        sortOrder?:SortOrder
        };

        type IOptionResult = {
        page: number;
        limit: number;
        skip: number;
        sortBy:string;
        sortOrder:SortOrder
        };

        const calculatePagination = (options: IOptions): IOptionResult => {
                const page = Number(options.page || 1);
                const limit = Number(options.limit || 10);
                const skip = (page - 1) * limit;


                const sortBy     = options.sortBy || "createdAt"
                const sortOrder = options.sortOrder || "desc"

                return {
                page,
                limit,
                skip,
                sortBy,
                sortOrder
                };
        };



