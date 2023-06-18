const mongoose = require("mongoose")

const lawyerSchema = mongoose.Schema(
    {
        "name": String,
        "specialization": String,
        "experience": String,
        "location": String,
        "contact": {
          "phone": String,
          "email": String,
          "password":String
        },
        
        "image": String,
        "rating": Number,
        "sloats":{type:Object}
      }
      
)

const LawyerModel = mongoose.model("lawyermodel",lawyerSchema)

module.exports = {LawyerModel}