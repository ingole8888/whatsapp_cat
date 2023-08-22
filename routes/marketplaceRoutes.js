const express = require("express");

const marketPlaceModel = require("../models/marketplaceModel");

const marketPlaceController = express.Router();

marketPlaceController.post("/addmarketPlace", async (req, res) => {
  const { marketPlaceName } = req.body;

  try {
    const rag = await marketPlaceModel.findOne({ marketPlaceName });

    if (rag) {
      return res
        .status(501)
        .send({ status: 501, message: "marketPlace already present!" });
    }

    const marketPlace1 = new marketPlaceModel({
      marketPlaceName
      
    });

    await marketPlace1.save();
    return res
      .status(200)
      .send({ status: 200, message: "marketPlace register successfull", marketPlace1 });
  } catch (error) {
    res.send(error)
  }
});

marketPlaceController.get("/getmarketPlace", async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.find();
    res.send(marketPlace);
  } catch (error) {
    res.send(error)
  }
});

//update district by id
marketPlaceController.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const rag = await marketPlaceModel.findByIdAndUpdate(id,
      {
        $set: req.body,
      },
      { new: true })
    res.status(200).send(rag)
  } catch (error) {
    res.send(error)
  }
})

//delete marketPlace by id 

marketPlaceController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
    const marketPlace = await marketPlaceModel.findByIdAndRemove(id)
  res.send(marketPlace)
  } catch (error) {
    res.send(error)
  }
})

module.exports = marketPlaceController;
