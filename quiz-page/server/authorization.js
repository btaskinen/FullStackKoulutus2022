// authorization middleware. Add to routes that need to be protected

const jwt = require("jsonwebtoken");

const tokenVerification = (req, res, next) => {
  const token = req.header("Authorization"); // Bearer TOKEN
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  tokenVerification,
};
