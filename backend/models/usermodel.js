const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        appointment:{
            type:Object
        },
        status:{
            type:Boolean
        }
    }

    , {
        versionKey: false
    })
const usermodel = mongoose.model("userdetails", schema)
module.exports = {
    usermodel
}