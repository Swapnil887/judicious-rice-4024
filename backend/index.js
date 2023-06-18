const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const { userrouter } = require("./routes/user_route");
const app = express()
app.use(express.json())
const cors=require('cors');
const { clientRoute } = require("./routes/client");
const { lawyerRoute } = require("./routes/Lawyers");
app.use(cors())
app.get('/',(req,res)=>{
    res.send('welcome')
})
app.use("/user",userrouter)
app.use("/client",clientRoute)
app.use("/lawyer",lawyerRoute)

app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running ${process.env.PORT}`)
})