// make connection to mongodb database
const User = require("./models/user");
const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// Path: backend/controllers/noteController.js

// save user to the database

const saveUser = async (req, res) => {
  const user = await new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
