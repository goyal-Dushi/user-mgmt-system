const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("This is login page for the user");
  })
  .post((req, res) => {
    User.findOne(req.body, (err, data) => {
      if (err) {
        res.status(404).json({ error: err });
      } else if (!data) {
        res.json({
          msg: "Unable to find user. Incorrect Password or Email",
          type: "error",
          status: false,
        });
      } else {
        res.status(200).json({
          userID: data?._id,
          status: true,
          msg: "User Login successful!",
          type: "success",
        });
      }
    });
  });

router
  .route("/register")
  .get((req, res) => {
    res.send("This is user register page");
  })
  .post((req, res) => {
    const newUser = new User(req.body);

    newUser.save((err, data) => {
      if (err) {
        res.status(400).json({ msg: "Not able to register user" });
      } else {
        res.status(200).json({
          msg: "User registered successfully",
          userID: data._id,
          type: "success",
        });
      }
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    User.findById(id, (err, response) => {
      if (err) {
        res.status(400).json({ msg: "User not found", type: "error" });
      } else {
        res.status(200).json(response);
      }
    });
  })
  .put((req, res) => {
    const phone = req.body.mobileNum;
    const userEmail = req.body.email;
    const pwd = req.body.password;
    const id = req.params.id;
    const adminAccess = req.body.role;

    User.findByIdAndUpdate(
      id,
      {
        email: userEmail,
        password: pwd,
        phoneNum: phone,
        role: adminAccess,
      },
      (err) => {
        if (err) {
          res
            .status(400)
            .json({ msg: "User details cannot be updated", error: err });
        } else {
          res
            .status(200)
            .json({ msg: "User details updated successfully!", type: "info" });
        }
      }
    );
  });

module.exports = router;
