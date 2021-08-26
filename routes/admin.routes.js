const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("This is login page for the Admin");
  })
  .post((req, res) => {
    const pwd = req.body.password;

    User.findOne({ password: pwd }, (err, data) => {
      if (err || !data.role) {
        res.status(404).json({
          msg: "You do not have Admin priviledges yet. Please register yourself as Admin",
        });
      } else {
        res.status(200).json({ adminID: data._id });
      }
    });
  });

router
  .route("/register")
  .get((req, res) => {
    res.send("This is Admin register page");
  })
  .post((req, res) => {
    const userEmail = req.body.email;
    const pwd = req.body.password;
    const phone = req.body.mobileNum;

    const newUser = new User({
      email: userEmail,
      password: pwd,
      phoneNum: phone,
      role: true,
    });

    newUser.save((err, data) => {
      if (err) {
        res.status(400).json({ msg: "Not able to register new admin" });
      } else {
        res
          .status(200)
          .json({ msg: "Admin registration successful", adminID: data._id });
      }
    });
  });

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  let userRole;
  User.findById(id, (err, data) => {
    if (err) {
      res
        .status(402)
        .json({ msg: "User dosen't exist. Please register Yourself" });
    } else {
      userRole = data.role;
    }
  });

  User.find({}, (err, data) => {
    if (err || !userRole) {
      res
        .status(400)
        .json({
          msg: "Not able to access users! Either there are some server errors, or you don't have Admin Access.",
        });
    } else {
      res.status(200).json(data);
    }
  });
});

router.route("/delete/:id").get((req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, (err, response) => {
    if (err) {
      res.status(400).json({ msg: "Cannot delete!", error: err });
    } else {
      res
        .status(200)
        .json({ msg: "Deleted user successfully", data: response });
    }
  });
});

module.exports = router;
