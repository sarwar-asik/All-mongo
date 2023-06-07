import { IGenericErrorMessage } from "./Ierror";

export type IGenericResponse ={
    statusCode:number;
    message:string;
    // errorMessages:{
    //     path:string,
    //     message:string
    // }[]
    errorMessages:IGenericErrorMessage[]
}