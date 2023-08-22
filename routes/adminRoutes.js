const express = require("express");

const adminModel = require("../models/adminModel");

const adminController = express.Router();

adminController.post("/addgroup", async (req, res) => {
  const { groupName, descr  } = req.body;

  try {
    const rag = await adminModel.findOne({ groupName });

    if (rag) {
      return res
        .status(501)
        .send({ status: 501, message: "group already present!" });
    }

    const admin1 = new adminModel({
        groupName, descr
    });

    await admin1.save();
    return res
      .status(200)
      .send({ status: 200, message: "group register successfull", admin1 });
  } catch (error) {
    res.send(error)
  }
});

adminController.get("/getgroup", async (req, res) => {
  try {
    const admin = await adminModel.find();
    res.send(admin);
  } catch (error) {
    res.send(error)
  }
});

//update district by id
adminController.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const rag = await adminModel.findByIdAndUpdate(id,
      {
        $set: req.body,
      },
      { new: true })
    res.status(200).send(rag)
  } catch (error) {
    res.send(error)
  }
})

//delete admin by id 

adminController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
    const admin = await adminModel.findByIdAndRemove(id)
  res.send(admin)
  } catch (error) {
    res.send(error)
  }
})

module.exports = adminController;
