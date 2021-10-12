const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");
const Post = require("../models/Post");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId) {
    const user = await User.findById(req.params.id);
    try {
      await User.findByIdAndDelete(req.params.id);
      await Post.deleteMany({ username: user.username });
      res.status(200).send("user and posts has been deleted");
    } catch (error) {
      res.status(401).send("you can delete only your account");
    }
  } else {
    res.status(401).send("you can delete only your account");
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
