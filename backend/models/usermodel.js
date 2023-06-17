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
            default: 'client'
        },
        appointment: {
            type: Object
        },
        status: {
            type: Boolean,
            default: false
        }
    }

    , {
        versionKey: false
    })
const usermodel = mongoose.model("userdetails", schema)
module.exports = {
    usermodel
}