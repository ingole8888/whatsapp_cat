const express = require("express");

const adduserModel = require("../models/addusermodel");

const userController = express.Router();

userController.post("/adduser", async (req, res) => {
  const { groupName, userName,  mobileNumber, role } = req.body;

  try {
    const rag = await adduserModel.findOne({ userName });

    if (rag) {
      return res
        .status(501)
        .send({ status: 501, message: "user already present!" });
    }

    const user1 = new adduserModel({
      userName, groupName, mobileNumber, role
    });

    await user1.save();
    return res
      .status(200)
      .send({ status: 200, message: "user register successfull", user1 });
  } catch (error) {
    res.send(error)
  }
});

userController.get("/getuser", async (req, res) => {
  try {
    const user = await adduserModel.find();
    res.send(user);
  } catch (error) {
    res.send(error)
  }
});

//update district by id
userController.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const rag = await adduserModel.findByIdAndUpdate(id,
      {
        $set: req.body,
      },
      { new: true })
    res.status(200).send(rag)
  } catch (error) {
    res.send(error)
  }
})

//delete user by id 

userController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
    const user = await adduserModel.findByIdAndRemove(id)
  res.send(user)
  } catch (error) {
    res.send(error)
  }
})

module.exports = userController;
