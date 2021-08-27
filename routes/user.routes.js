const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router
  .route("/login")
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
          status: false,
        });
      } else {
        res.status(200).json({
          userID: data?._id,
          status: true,
          msg: "User Login successful!",
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
        res
          .status(400)
          .json({ msg: "Not able to register user", status: false });
      } else {
        res.status(200).json({
          msg: "User registered successfully",
          status: true,
          userID: data._id,
        });
      }
    });
  });

router.route("/").get((req, res) => {
  User.find({}, (err, response) => {
    if (err) {
      res.status(403).json({ msg: "Not able to get users!", error: err });
    } else {
      res.status(200).json(response);
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
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "User details cannot be updated", error: err });
      } else {
        res.status(200).json({ msg: "User details updated successfully!" });
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id, (err, response) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "Error occurred while deleting", error: err });
      } else {
        res.status(200).json({ msg: "Successfully Deleted User!" });
      }
    });
  });

module.exports = router;
