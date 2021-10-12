const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("you must input token !");
  }
  try {
    const verifyToken = jwt.verify(token, "privatekey");
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(404).send("Invaild Token");
  }
};
