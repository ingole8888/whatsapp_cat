const express=require("express")
const cors = require('cors')
const connection= require("./config/config")

const adminController = require("./routes/adminRoutes")
const userController = require("./routes/addUserRoutes")
const marketPlaceController = require("./routes/marketplaceRoutes")
const productsController = require("./routes/productsRoutes")

require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())

app.use("/user", userController)
app.use("/createGroup", adminController)
app.use("/products", productsController)
app.use("/market", marketPlaceController)

app.get("/",(req,res)=>{
    return res.status(200).send("HomePage");
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`db connect at ${process.env.PORT}`);
})