const router = require("express").Router();
const db = require("./users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name
  };

  newUser.password = bcrypt.hashSync(newUser.password, 10);
  db.addUser(newUser)
    .then(addedUser => {
      res.status(201).json({
        message: `${addedUser.username} has been created successfully!`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: `There was an issue creating this account. Please try again.`
      });
    });
});

router.post("/signin", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  db.getUserByUsername(user.username).then(foundUser => {
    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      const token = generateToken(user);
      res.status(200).json({
        token: token,
        email: foundUser.username
      });
    } else {
      if (!foundUser) {
        res.status(400).json({
          message: `${user.email} does not exist in our database.`
        });
      } else if (
        foundUser &&
        !bcrypt.compareSync(user.password, foundUser.password)
      ) {
        res.status(400).json({
          message: `There was an error logging in. Please try again`
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

function generateToken(user) {
  // console.log("user: ", user);
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };

  const jwtSecret = process.env.JWT_SECRET || "123789456!";
  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;
