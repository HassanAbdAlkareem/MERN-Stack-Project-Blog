const router = require("express").Router();
const Category = require("../models/Categoy");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    await newCat.save();
    res.status(200).send(newCat);
    //
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const getCate = await Category.find();
    res.status(200).send(getCate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
