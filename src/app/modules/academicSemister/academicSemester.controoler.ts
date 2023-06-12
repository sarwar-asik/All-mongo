/* eslint-disable no-console */
import { RequestHandler } from "express";
import { academicSemesterService } from "./academicSemesterServices";
import { AcademicSemester } from "./AcademicSemesterModel";

const createAcademicSemester: RequestHandler = async (req, res, next) => {
    try {
      const {...academicSemester} = req.body;
      // console.log(academicSemester, 'from controller=================');

      const result = await academicSemesterService.createAcademicSemesterService(academicSemester);
      if (result) {
        res.status(200).send({
          success: true,
          message: 'successfully created Academic Semester',
          data: result,
        });
      }
    } catch (error) {
      // res.status(400).send({ status: 'had an error in createUser', error })
      next(error);
    }
  }

  const getAcademicSemester: RequestHandler = async (req, res) => {
    try {
        // console.log("hitted getAcademic");
      const data = await AcademicSemester.find();
      if(data.length>0){

          res.send({status:true,data:data});
      }
      else{
        res.status(400).send({status:false,message:"Not found data"})

      }
    } catch (error) {
      res
        .status(400)
        .send({ status: 'had an error in getUser Controller', error });
    }
  };
  



export const AcademicSemesterController = {createAcademicSemester,getAcademicSemester}
  
  