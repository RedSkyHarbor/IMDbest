const jwt = require("jsonwebtoken");

/* Checks if user has valid auth token */
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.MOVIES_TOKEN_SECRET);
    req.body.userId = verified.id;
    req.body.is_admin = verified.is_admin;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
