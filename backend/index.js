const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const mongosoe = require("mongoose")
const app = express()
app.use(express())



app.listen(process.env.port,async ()=>{
    await connection
    console.log("server is running")
})