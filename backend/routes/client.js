//client can book sloat

const mongoose = require("mongoose");
const express = require("express");
const { LawyerModel } = require("../models/lawyerModel");
const { usermodel } = require("../models/usermodel");
// const { LawyerModel } = require("../models/lawyerModel");


const clientRoute = express()


clientRoute.get("/user",async(req,res)=>{
  const {email} = req.query
  try {
    var data =  await usermodel.findOne({email})
    res.json(data)  
  } catch (error) {
    console.log(error)
    res.json("something went wrong while getting user profile")
  }
    
})


// this route will give all the doctors of specific specialization pass specialization in query
clientRoute.get("/get/", async (req, res) => {
  const { specialization } = req.query
  try {
    console.log(req.query)
    var lawyerData = await LawyerModel.find({ specialization })
    res.send(lawyerData)
  } catch (error) {

    res.send("something went wrong while finding lawyers")
  }

})

// then he will select specific field lawyer

clientRoute.get("/get/:id", async (req, res) => {
  const _id = req.params.id
  try {
    console.log(_id)

    var lawyerData = await LawyerModel.findOne({ _id: _id })
    console.log(lawyerData)
    res.send(lawyerData)
  } catch (error) {
    console.log(error)
    res.send("something went wrong while finding lawyers")
  }

})

//now i have multile time sloats

// if i click any of the time sloat then the data will store like obj

// var obj = {appoinment:{'[10,11]':"lawyerA detail",'[12,15]':"lawyerb details"}}
// console.log(obj.appoinment['[10,10]'])

clientRoute.get("/book", async (req, res) => {
  // const clientEmail = 'chinachin1975@gmail.com'
  // const lawyerId = ''
  // const bookingsloat = "19:00,19:30"

  var { clientEmail, lawyerId, bookingsloat } = req.query
  // const sloatnumber = "sloat2"
  console.log(clientEmail, lawyerId, bookingsloat)
  try {

    //for client data updation
    const l = await LawyerModel.findOne({ _id: lawyerId })
    const c = await usermodel.findOne({ email: clientEmail })
    console.log(c, "c")
    console.log(l, "l")
    var obj = { ...c.appointment };

    if (obj == undefined) {
      var newObj = {}
      newObj[bookingsloat] = l.name
    } else {
      obj[bookingsloat] = l.name
      var newObj = { ...obj }
    }

    // obj[bookingsloat] = l;

    console.log(obj)

    var updateClient = await usermodel.updateOne({ email: clientEmail }, { appointment: newObj })

    var arr = { ...l.sloats }
    arr[bookingsloat] = "booked"

    console.log(arr)
    const updateLawyer = await LawyerModel.updateOne({ _id: lawyerId }, { sloats: arr })
    console.log(updateLawyer)



    console.log('bo')
    res.json("Booked")
  }
  catch (error) {
    console.log(error)
    res.json("something wrong while booking")
  }
})


module.exports = { clientRoute }







async function fun() {
  var x = await usermodel.find();
  console.log(x)
}

fun()



