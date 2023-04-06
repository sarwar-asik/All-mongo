const app = require("express")

app.post("/addData",async(req,res)=>{

    const newData =new Model1(req.body)
    try{
    //  const result =   newData.save()   /////or 
    const result  =await Model1.create(req.body)
    




    }
    catch(error){
    res.send({status:400,error:error.message})
    }
})