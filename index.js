const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/mgmtDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const database = mongoose.connection;

database.once("open", () => {
  console.log("Database connection successful!");
});

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(PORT, () => {
  console.log("Server started at: ", PORT);
});
