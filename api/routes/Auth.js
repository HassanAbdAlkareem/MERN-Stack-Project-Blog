const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    let user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    return res.header({ "x-auth-token": user.AuthToken() }).send(user);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).send("Invaild username");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).send("invaild password");

    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
