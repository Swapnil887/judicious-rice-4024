//client can book sloat

const mongoose = require("mongoose");
const express = require("express");
const { LawyerModel } = require("../models/lawyerModel");
const { usermodel } = require("../models/usermodel");
// const { LawyerModel } = require("../models/lawyerModel");


const clientRoute = express()

var lawyers= [
    {
      "name": "John Doe",
      "specialization": "Criminal Law",
      "experience": "10 years",
      "location": "New York",
      "contact": {
        "phone": "123-456-7890",
        "email": "john.doe@example.com"
      },
      "image": "https://example.com/john_doe.jpg",
      "rating": 4.5
    },
    {
      "name": "Jane Smith",
      "specialization": "Corporate Law",
      "experience": "8 years",
      "location": "Los Angeles",
      "contact": {
        "phone": "987-654-3210",
        "email": "jane.smith@example.com"
      },
      "image": "https://example.com/jane_smith.jpg",
      "rating": 4.2
    },
    {
      "name": "Michael Johnson",
      "specialization": "Family Law",
      "experience": "12 years",
      "location": "Chicago",
      "contact": {
        "phone": "555-123-4567",
        "email": "michael.johnson@example.com"
      },
      "image": "https://example.com/michael_johnson.jpg",
      "rating": 4.9
    },
    {
      "name": "Emily Brown",
      "specialization": "Intellectual Property Law",
      "experience": "6 years",
      "location": "San Francisco",
      "contact": {
        "phone": "444-567-8901",
        "email": "emily.brown@example.com"
      },
      "image": "https://example.com/emily_brown.jpg",
      "rating": 4.7
    },
    {
      "name": "David Wilson",
      "specialization": "Real Estate Law",
      "experience": "15 years",
      "location": "Miami",
      "contact": {
        "phone": "777-890-1234",
        "email": "david.wilson@example.com"
      },
      "image": "https://example.com/david_wilson.jpg",
      "rating": 4.6
    },
    {
      "name": "Sarah Garcia",
      "specialization": "Immigration Law",
      "experience": "9 years",
      "location": "Houston",
      "contact": {
        "phone": "222-345-6789",
        "email": "sarah.garcia@example.com"
      },
      "image": "https://example.com/sarah_garcia.jpg",
      "rating": 4.3
    },
    {
      "name": "Robert Davis",
      "specialization": "Personal Injury Law",
      "experience": "11 years",
      "location": "Boston",
      "contact": {
        "phone": "888-901-2345",
        "email": "robert.davis@example.com"
      },
      "image": "https://example.com/robert_davis.jpg",
      "rating": 4.4
    },
    {
      "name": "Jennifer Clark",
      "specialization": "Environmental Law",
      "experience": "7 years",
      "location": "Seattle",
      "contact": {
        "phone": "666-789-0123",
        "email": "jennifer.clark@example.com"
      },
      "image": "https://examplecom/jennifer_clark.jpg",
      "rating": 4.8
      },
      {
      "name": "Daniel Lee",
      "specialization": "Tax Law",
      "experience": "14 years",
      "location": "Washington, D.C.",
      "contact": {
      "phone": "333-901-2345",
      "email": "daniel.lee@example.com"
      },
      "image": "https://example.com/daniel_lee.jpg",
      "rating": 4.9
      },
      {
      "name": "Maria Rodriguez",
      "specialization": "Labor Law",
      "experience": "10 years",
      "location": "Dallas",
      "contact": {
      "phone": "999-234-5678",
      "email": "maria.rodriguez@example.com"
      },
      "image": "https://example.com/maria_rodriguez.jpg",
      "rating": 4.7
      },
      {
      "name": "Christopher White",
      "specialization": "Bankruptcy Law",
      "experience": "8 years",
      "location": "Phoenix",
      "contact": {
      "phone": "111-678-9012",
      "email": "christopher.white@example.com"
      },
      "image": "https://example.com/christopher_white.jpg",
      "rating": 4.6
      },
      {
      "name": "Jessica Brown",
      "specialization": "Employment Law",
      "experience": "9 years",
      "location": "Denver",
      "contact": {
      "phone": "555-987-6543",
      "email": "jessica.brown@example.com"
      },
      "image": "https://example.com/jessica_brown.jpg",
      "rating": 4.5
      },
      {
      "name": "Andrew Wilson",
      "specialization": "Intellectual Property Law",
      "experience": "13 years",
      "location": "San Francisco",
      "contact": {
      "phone": "777-222-3333",
      "email": "andrew.wilson@example.com"
      },
      "image": "https://example.com/andrew_wilson.jpg",
      "rating": 4.8
      },
      {
      "name": "Sophia Davis",
      "specialization": "Family Law",
      "experience": "11 years",
      "location": "Chicago",
      "contact": {
      "phone": "444-111-2222",
      "email": "sophia.davis@example.com"
      },
      "image": "https://example.com/sophia_davis.jpg",
      "rating": 4.4
      },
      {
      "name": "Samuel Johnson",
      "specialization": "Criminal Law",
      "experience": "15 years",
      "location": "New York",
      "contact": {
      "phone": "888-555-4444",
      "email": "samuel.johnson@example.com"
      },
      "image": "https://example.com/samuel_johnson.jpg",
      "rating": 4.7
      },
      {
          "name": "Olivia Martinez",
          "specialization": "Immigration Law",
          "experience": "8 years",
          "location": "Los Angeles",
          "contact": {
          "phone": "777-888-9999",
          "email": "olivia.martinez@example.com"
          }
      }
      
     ]


// this route will give all the doctors of specific specialization pass specialization in query
clientRoute.get("/get/",async (req,res)=>{
    const {specialization} = req.query
    try {
      console.log(req.query)
        var lawyerData =await LawyerModel.find({specialization})
        res.send(lawyerData)
    } catch (error) {

        res.send("something went wrong while finding lawyers")    
    }
    
})

// then he will select specific field lawyer

clientRoute.get("/get/:id",async (req,res)=>{
    const _id = req.params.id
    try {
        console.log(_id)
    
        var lawyerData =await LawyerModel.findOne({_id:_id})
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

clientRoute.get("/book",async (req,res)=>{
  // const clientEmail = 'chinachin1975@gmail.com'
  // const lawyerId = ''
  // const bookingsloat = "19:00,19:30"

  var {clientEmail,lawyerId,bookingsloat} = req.query
  // const sloatnumber = "sloat2"
  try {

    //for client data updation
    const l = await LawyerModel.findOne({_id:lawyerId})
    const c = await usermodel.findOne({email:clientEmail})
    console.log(c)
    var obj = {...c.appointment};

    if(obj==undefined){
      var newObj = {}
      newObj[bookingsloat] = l.name
    }else{
      obj[bookingsloat] = l.name
      var newObj = {...obj}
    }
    
    // obj[bookingsloat] = l;

    console.log(obj)

      var updateClient =await usermodel.updateOne({email:clientEmail},{appointment:newObj})

    var arr = {...l.sloats}
    arr[bookingsloat] = "booked"
    
    console.log(arr)
    const updateLawyer = await LawyerModel.updateOne({_id:lawyerId},{sloats:arr})
     console.log(updateLawyer)

    
    
console.log('bo')
    res.json("Booked")
  } 
  catch (error) {
    console.log(error)
    res.json("something wrong while booking")
  }
})


module.exports = {clientRoute}



// async function  fun(){
//   var x =await usermodel.find();
//   console.log(x)
// }

// fun()



