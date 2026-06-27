const express = require('express')

const app = require('./src/app')
const connectToDB = require('./src/config/databas')
require('dotenv').config()

connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})