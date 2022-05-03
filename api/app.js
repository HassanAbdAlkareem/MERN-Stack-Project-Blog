const express = require("express");
require("express-async-errors");

const mongoose = require("mongoose");
const dotnev = require("dotenv");
const multer = require("multer");
const path = require("path");

const app = express();
const routeAuth = require("./routes/Auth");
const routeUser = require("./routes/User");
const routePost = require("./routes/Posts");
const routeCate = require("./routes/Categories");

dotnev.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((error) => console.log("faild connected to db" + error));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
//
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).send("file has been uploaded");
});
//
app.use("/api/auth", routeAuth);
app.use("/api/users", routeUser);
app.use("/api/posts", routePost);
app.use("/api/categories", routeCate);

app.listen(process.env.PORT || 5000, () => {
  console.log("server runing");
});
