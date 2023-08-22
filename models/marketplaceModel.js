const mongoose=require("mongoose")

const marketPlaceSchema= new mongoose.Schema({
   marketPlaceName:{type:String},
})

const marketPlaceModel=mongoose.model("marketPlace",marketPlaceSchema)

module.exports=marketPlaceModel