const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({ username: req.body.username });
    !getUser && res.status(400).send("Invaild username");

    const validated = await bcrypt.compare(req.body.password, getUser.password);
    !validated && res.status(400).send("invaild password");

    if (getUser) {
      const generateToken = jwt.sign({ id: getUser._id }, "PrivateKey");
      const { password, ...user } = getUser._doc;

      res.status(200).json({
        user,
        token: generateToken,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
