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

## Create src>shared>pick > (for get {"page": "1","limit": "10"} by pick(req.query,["page","limit","sortBY","sortBY"])) ::::

        const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T,keys: k[]): Partial<T> => {
            console.log('sortItem', obj, keys, 'From sort');

            const finalObj: Partial<T> = {};

                for (const key of keys) {
                    if (obj && Object.hasOwnProperty.call(obj, key)) {
                    // console.log(Object.hasOwnProperty.call(obj, key));

                    finalObj[key] = obj[key];
                    }
                }
             //   console.log('Final object', finalObj);

             return finalObj;
        };

        export default pick;

## src>const>pagination.ts> ::::

            export const paginationFields = ["page","limit","sortBy","sortOrder"]

        

#### create modules>AcademicSemester>AcademicSemesterService :::::


