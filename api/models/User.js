const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, max: 25, min: 5 },
    email: { type: String, required: true, max: 25, min: 5 },
    password: { type: String, required: true, min: 5, max: 300 },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashPassword;
  next();
});

UserSchema.methods.AuthToken = function () {
  return jwt.sign(this.toJSON(), "privatekey");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
