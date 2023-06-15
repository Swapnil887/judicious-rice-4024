// lawyer can open or close slot

const {createTimeSlots} = require("../controllers/timeSloatgenrator")

const express = require("express");
const { LawyerModel } = require("../models/lawyerModel");

const lawyerRoute = express();

lawyerRoute.patch("/get/:id",async (req,res)=>{
    const _id = req.params.id
    const {slotDuration,startTime,endTime} = req.query;
    try {
        console.log(req.query)
// Define your working hours and time slot duration
 
        const appointmentSlots = createTimeSlots(startTime,endTime,+slotDuration)
        console.log(appointmentSlots)
        var arr = []
        var sloat = 1
        for(var i=0;i<appointmentSlots.length-2;i+=2){
            var obj = {}
            var obj_val = {}
            obj_val[[appointmentSlots[i],appointmentSlots[i+1]]]="not booked"
            obj[`sloat${sloat}`] = obj_val
            sloat++
            arr.push(obj)
        }
        console.log(arr)
        var lawyerData =await LawyerModel.updateOne({_id:_id},{sloats:arr})
        res.send(lawyerData)
    } catch (error) {
        console.log(error)
        res.send("something went wrong while finding lawyers")    
    }
    
})



module.exports = {lawyerRoute}


