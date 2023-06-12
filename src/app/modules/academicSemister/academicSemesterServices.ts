import { AcademicSemester } from "./AcademicSemesterModel"
import { IAcademicSemester } from "./academicSemister.interace"

 const createAcademicSemesterService =async(payload:IAcademicSemester):Promise<IAcademicSemester>=>{
const result = await AcademicSemester.create(payload)
return result


}



export const academicSemesterService ={createAcademicSemesterService}