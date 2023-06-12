import { IAcademicSemesterCode, IAcademicSemesterMonth, IAcademicSemesterTitle } from "./academicSemister.interace";

export const AcademicSemesterMonth:IAcademicSemesterMonth[] =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]


export const AcademicSemesterTitles:IAcademicSemesterTitle[] =  ['Autumn', 'Summer', 'Fall']
export const AcademicSemesterCode:IAcademicSemesterCode[] =  ['01', '02', '03']


export const academicSemesterTittleCodeMapper:{
    [key:string]:string
} = {
    Autumn:"01",
    Summer:"02",
    Fall:"03"
}