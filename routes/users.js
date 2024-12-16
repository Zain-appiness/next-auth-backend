const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user if email doesn't exist
    const newUser = await User.create({ name, email });
    res.status(201).json({ message: "User saved!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  console.log('Checking user with email:', email);  // Debug log
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json(null);
  }
});

module.exports = router;
