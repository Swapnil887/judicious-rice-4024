// lawyer can open or close slot

const {createTimeSlots} = require("../controllers/timeSloatgenrator")

const express = require("express");
const { LawyerModel } = require("../models/lawyerModel");

const lawyerRoute = express();

lawyerRoute.get("/update/:id",async (req,res)=>{
    
    const _id = req.params.id
    const {slotDuration,startTime,endTime} = req.query;
    try {
        // console.log(req.query)
// Define your working hours and time slot duration
 
        const appointmentSlots = createTimeSlots(startTime,endTime,+slotDuration)
        // console.log(appointmentSlots)
        var arr = {}
        var sloat = 1
        for(var i=0;i<appointmentSlots.length-2;i+=2){
            
            
            arr[[appointmentSlots[i],appointmentSlots[i+1]]]="not booked"
        }
        console.log(arr)
        var lawyerData =await LawyerModel.findOneAndUpdate({_id:_id},{sloats:arr})

        console.log("update")
        res.json(lawyerData)
    } catch (error) {
        console.log(error)
        res.send("something went wrong while finding lawyers")    
    }
    
})




module.exports = {lawyerRoute}


