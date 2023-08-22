const mongoose=require("mongoose")

const adminSchema= new mongoose.Schema({
   groupName:{type:String},
   descr:{type:String}
})

const adminModel=mongoose.model("admin",adminSchema)

module.exports=adminModel