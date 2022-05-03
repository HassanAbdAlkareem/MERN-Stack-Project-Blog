const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.auth;
  if (!token) {
    res.status(401).send("you must input token !");
  }
  try {
    const verifyToken = jwt.verify(token, "PrivateKey");
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(404).send("Invaild Token");
  }
};
