const mongoose=require("mongoose")

const productsSchema= new mongoose.Schema({
   productName:{type:String},
   productDesc:{type:String},
   productPrice:{type:Number},
   productImage:{type:String},
   quntity:{type:Number,default:1},
})

const productsModel=mongoose.model("products",productsSchema)

module.exports=productsModel