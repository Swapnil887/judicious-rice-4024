//client can book sloat

const mongoose = require("mongoose");
const express = require("express");
const { LawyerModel } = require("../models/lawyerModel");
const { usermodel } = require("../models/usermodel");
const { lawyerRoute } = require("./Lawyers");
const { logger } = require("handlebars");
const { outhuser } = require("../models/outh");
// const { LawyerModel } = require("../models/lawyerModel");


const clientRoute = express()


clientRoute.get("/user", async (req, res) => {
  const { email } = req.query
  try {
    var data = await usermodel.findOne({ email })
    var x_data = await outhuser.findOne({email})
    if(data){
      res.json(data)
    }else{
      res.json(x_data)
    }
    
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
    const o = await outhuser.findOne({ email: clientEmail })
    if(c){
      console.log(c, "c")
    console.log(l, "l")
    var obj = { ...c.appointment };

    if (obj == undefined) {
      var newObj = {}
      newObj[bookingsloat] = l
    } else {
      obj[bookingsloat] = l
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
    }else{
      console.log(0, "c")
      console.log(l, "l")
      var obj = { ...o.appointment };
  
      if (obj == undefined) {
        var newObj = {}
        newObj[bookingsloat] = l
      } else {
        obj[bookingsloat] = l
        var newObj = { ...obj }
      }
  
      // obj[bookingsloat] = l;
  
      console.log(obj)
  
      var updateClient = await outhuser.updateOne({ email: clientEmail }, { appointment: newObj })
  
      var arr = { ...l.sloats }
      arr[bookingsloat] = "booked"
  
      console.log(arr)
      const updateLawyer = await LawyerModel.updateOne({ _id: lawyerId }, { sloats: arr })
      console.log(updateLawyer)
  
  
  
      console.log('bo')
      res.json("Booked")
    }
    
  }
  catch (error) {
    console.log(error)
    res.json("something wrong while booking")
  }
})

clientRoute.get("/cancle", async (req, res) => {
  try {
    const { time, email, lawyer_id } = req.query
    console.log(lawyer_id, time, email)
    const f = await LawyerModel.findOne({ _id: lawyer_id })


    var booking_slot = { ...f.sloats }
    booking_slot[time] = "not booked"

    // console.log(booking_slot)


    // console.log(booking)

    await LawyerModel.updateOne({ _id: lawyer_id }, { sloats: booking_slot })
    var x = await usermodel.find({ email: email })
    var y = await outhuser.find({email:email})

    if(x.length!=0){
      var user_appointment = { ...x[0].appointment }
    console.log(user_appointment)
    delete user_appointment[time]
    console.log("ffffff", user_appointment)
    var y = await usermodel.updateOne({ email: email }, { appointment: user_appointment })
    console.log(y)
    res.json("appoinment cancled")
    }
    else{
      var user_appointment = { ...y[0].appointment }
    console.log(user_appointment)
    delete user_appointment[time]
    console.log("ffffff", user_appointment)
    await outhuser.updateOne({ email: email }, { appointment: user_appointment })
    
    res.json("appoinment cancled")
    }
    
  } catch (error) {
    console.log(error)
    res.json("something went wrong in canciling")

  }
})



module.exports = { clientRoute }







