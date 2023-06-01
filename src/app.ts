// const express = require('express')
import  express, { Application } from "express"

const app :Application = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default app 