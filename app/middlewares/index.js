const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("no token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to auth" });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
