const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Post = require("../models/Post");

//create post
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.username === req.body.username) {
    try {
      await post.delete();
      res.status(200).json("Post has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//get one post
router.get("/:id", async (req, res) => {
  const onePost = await Post.findById(req.params.id);

  try {
    res.status(200).send(onePost);
  } catch (error) {
    res.send(error.message);
  }
});

//get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } //
    else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } //
    else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
    //
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
