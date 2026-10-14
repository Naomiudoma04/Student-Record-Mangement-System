require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT
const studentRoute = require('./router/studentRouter')

const app = express()
app.use(express.json())

app.use(studentRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
})