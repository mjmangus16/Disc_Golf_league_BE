const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "dev_key_001";

  console.log(token);
  console.log(secret);

  if (token) {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) {
        console.log(err);
        //invalid token
        res.status(401).json({ you: "shall not pass" });
      } else {
        //valid token

        req.jwt = { email: decoded.email, user_id: decoded.subject };

        next();
      }
    });
  } else {
    res.status(401).json({ you: "no token provided" });
  }
};
