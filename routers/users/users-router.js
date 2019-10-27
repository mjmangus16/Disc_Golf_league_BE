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

router.post("/create", (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };

  newUser.password = bcrypt.hashSync(newUser.password, 10);
  db.addUser(newUser)
    .then(addedUser => {
      console.log(addedUser.username);
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

router.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  db.getUserByUsername(user.username).then(foundUser => {
    console.log(foundUser);
    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      const token = generateToken(user);
      res.status(200).json({
        token: token,
        username: foundUser.username
      });
    } else {
      if (!foundUser) {
        res.status(400).json({
          message: `${user.username} does not exist in our database.`
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
            message: `${foundUser.username} was deleted from the database.`
          });
        } else {
          res.status(400).json({
            message: `There was an error trying to delete ${foundUser.username} from the database.`
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
