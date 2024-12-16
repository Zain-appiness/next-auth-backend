const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Create a new user in the database
    const newUser = await User.create({ name, email });
    res.status(201).json({ message: "User saved!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
