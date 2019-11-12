const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "dev_key_001";

  if (token) {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) {
        //invalid token
        res.status(401).json({
          error:
            "There was an issue with authorizing your account. Please log back in and try again."
        });
      } else if (decoded.admin) {
        //valid token

        req.jwt = {
          email: decoded.email,
          user_id: decoded.user_id,
          admin: decoded.admin
        };

        next();
      } else {
        res.status(401).json({ error: "Only an admin can access this data" });
      }
    });
  } else {
    res
      .status(401)
      .json({ error: "You must be logged in to access this information." });
  }
};
