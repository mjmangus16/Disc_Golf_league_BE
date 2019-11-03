const router = require("express").Router();
const db = require("./users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateSignup = require("../../validation/signup");
const validateSignin = require("../../validation/signin");

router.get("/test", (req, res) => {
  res.send("The users router is working!");
});

router.get("/", (req, res) => {
  db.getUsers()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(500).json({ error: "There are no users available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting users" });
    });
});

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = {
    org_name: req.body.org_name,
    email: req.body.email,
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name
  };

  newUser.password = bcrypt.hashSync(newUser.password, 10);
  db.addUser(newUser)
    .then(addedUser => {
      res.status(201).json({
        message: `Your account has been created successfully! Please sign in.`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        ...errors,
        signup_message: `There was an issue creating this account. Please try again.`
      });
    });
});

router.post("/signin", (req, res) => {
  const { errors, isValid } = validateSignin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  db.getUserByEmail(user.email).then(foundUser => {
    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      const payload = {
        id: user.id,
        email: user.email
      };

      // Sign Token
      jwt.sign(payload, "dev_key_001", { expiresIn: 7200 }, (err, token) => {
        res.status(200).json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      if (!foundUser) {
        res.status(400).json({
          ...errors,
          signin_message: `${user.email} does not exist in our database.`
        });
      } else if (
        foundUser &&
        !bcrypt.compareSync(user.password, foundUser.password)
      ) {
        res.status(400).json({
          ...errors,
          signin_message: `There was an error logging in. Please try again`
        });
      }
    }
  });
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  db.getUserById(id).then(foundUser => {
    if (foundUser) {
      db.deleteUser(id).then(deletedUser => {
        if (deletedUser) {
          res.status(200).json({
            message: `${foundUser.email} was deleted from the database.`
          });
        } else {
          res.status(400).json({
            message: `There was an error trying to delete ${foundUser.email} from the database.`
          });
        }
      });
    } else {
      res.status(400).json({
        message: "That user does not exist in our database."
      });
    }
  });
});

// function generateToken(user) {
//   // console.log("user: ", user);
//   const jwtPayload = {
//     subject: user.id,
//     email: user.email
//   };

//   const jwtSecret = process.env.JWT_SECRET || "123789456!";
//   const jwtOptions = {
//     expiresIn: "1d"
//   };

//   return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
// }

module.exports = router;
