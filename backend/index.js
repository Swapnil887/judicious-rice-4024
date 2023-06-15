const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const mongosoe = require("mongoose");
const {  clientRoute } = require("./routes/client");
const { lawyerRoute } = require("./routes/Lawyers");
const app = express()
app.use(express.json())


app.use("/client",clientRoute);
app.use("/lawyer",lawyerRoute);


app.listen(process.env.port,async ()=>{
    await connection
    console.log("server is running")
})