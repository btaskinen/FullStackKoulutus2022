// authorization middleware. Add to routes that need to be protected

const jwt = require("jsonwebtoken");
const pool = require("../quizdb/db");
const queries = require("../quizdb/queries");

// this middleware is for access where the user needs to be logged in
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

// this middleware is for access where the user needs to be an admin
const isAdmin = async (req, res, next) => {
  try {
    result = await pool.query(queries.isAdminQuerry, [req.user.userEmail]);
    const admin = result.rows[0].admin;
    if (admin) {
      next();
    } else {
      res.status(401).send("No acess!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// alternatively this code could be used and then only one middleware for admin right would be needed
// const isAdmin = async (req, res, next) => {
//   const token = req.header("Authorization");
//   console.log(token);
//   if (!token) return res.status(401).send("Access denied!");
//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     result = await pool.query(queries.isAdminQuerry, [req.user.userEmail]);
//     const admin = result.rows[0].admin;
//     if (admin) {
//       next();
//     } else {
//       res.status(401).send("No acess!");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

module.exports = {
  tokenVerification,
  isAdmin,
};
