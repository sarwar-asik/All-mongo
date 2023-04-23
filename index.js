const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
mongoose.set("strictQuery",false)

const url = process.env.URL;


app.get("/",async(req,res)=>{
    res.send(`Product Server is Running on ${PORT}`)
})

app.listen(PORT,()=>{
    console.log(`Server is connected with ${PORT}`);
})