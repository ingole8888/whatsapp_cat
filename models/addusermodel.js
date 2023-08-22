const mongoose = require("mongoose")

const adduserSchema = new mongoose.Schema({
    groupName: { type: String },
    userName: { type: String },
    mobileNumber: { type: Number },
    role:{type:String}
})

const adduserModel = mongoose.model("adduser", adduserSchema)

module.exports = adduserModel