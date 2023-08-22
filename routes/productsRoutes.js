const express = require("express");

const productsModel = require("../models/addProducts");

const productsController = express.Router();

productsController.post("/addproducts", async (req, res) => {
  const { productName , productDesc , productPrice
  , productImage, quntity } = req.body;

  try {
    const rag = await productsModel.findOne({ productName });

    if (rag) {
      return res
        .status(501)
        .send({ status: 501, message: "product already present!" });
    }

    const products1 = new productsModel({
     productDesc,productName, productImage, productPrice, quntity
      
    });

    await products1.save();
    return res
      .status(200)
      .send({ status: 200, message: "products register successfull", products1 });
  } catch (error) {
    res.send(error)
  }
});

productsController.get("/getproducts", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.send(products);
  } catch (error) {
    res.send(error)
  }
});

//update district by id
productsController.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const rag = await productsModel.findByIdAndUpdate(id,
      {
        $set: req.body,
      },
      { new: true })
    res.status(200).send(rag)
  } catch (error) {
    res.send(error)
  }
})

//delete products by id 

productsController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
    const products = await productsModel.findByIdAndRemove(id)
  res.send(products)
  } catch (error) {
    res.send(error)
  }
})

module.exports = productsController;
