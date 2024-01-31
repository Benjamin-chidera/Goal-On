require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const goalRouter = require("./router/goalRouter");
const userRouter = require("./router/userRouter");

app.use(express.json());
app.use(cors());
app.use("/api/v1", goalRouter);
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("home");
});

app.use((req, res) => {
  res.send("not found");
});

const server = async () => {
  try {
    await mongoose.connect(process.env.URL, { dbName: "GoalOnServer" });
    app.listen(PORT, (req, res) => {
      console.log("server is working");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
