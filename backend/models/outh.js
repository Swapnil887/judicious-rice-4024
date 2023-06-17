const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'client'
        },
        appointment: {
            type: Object
        }
    }
    , {
        versionKey: false
    })
const outhuser = mongoose.model("outhuser", schema)
module.exports = {
    outhuser
}