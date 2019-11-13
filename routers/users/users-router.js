const router = require("express").Router();
const dbUsers = require("./users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const restricted = require("../../middleware/restricted");

const validateSignup = require("../../validation/users/signup");
const validateSignin = require("../../validation/users/signin");
const validateUpdateUser = require("../../validation/users/updateUser");

router.get("/test", (req, res) => {
  res.send("The users router is working!");
});

router.get("/", (req, res) => {
  dbUsers
    .getUsers()
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
    l_name: req.body.l_name,
    admin: req.body.admin
  };

  newUser.password = bcrypt.hashSync(newUser.password, 10);
  dbUsers
    .addUser(newUser)
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

  dbUsers.getUserByEmail(user.email).then(foundUser => {
    // if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {

    // Removed the bcrypt.compareSync so that we can login with seed users without issue.

    if (foundUser) {
      const payload = {
        user_id: foundUser.user_id,
        email: foundUser.email,
        admin: foundUser.admin
      };

      // Sign Token
      jwt.sign(payload, "dev_key_001", { expiresIn: 14400 }, (err, token) => {
        res.status(200).json({
          success: true,
          token: token
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

router.get("/email/:email", restricted, (req, res) => {
  const { email } = req.params;
  dbUsers
    .getUserByEmail(email)
    .then(user => {
      if (user) {
        res.status(200).json({
          user_id: user.user_id,
          email: user.email,
          f_name: user.f_name,
          l_name: user.l_name,
          org_name: user.org_name
        });
      } else {
        res
          .status(500)
          .json({ email: "That user does not exist in our database" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ email: "Server error getting that user" });
    });
});

router.put("/update/:id", restricted, (req, res) => {
  const { errors, isValid } = validateUpdateUser(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  dbUsers
    .getUserById(id)
    .then(user => {
      if (user) {
        dbUsers
          .updateUser(id, req.body)
          .then(updatedUser => {
            res.status(200).json({
              f_name: updatedUser.f_name,
              l_name: updatedUser.l_name,
              org_name: updatedUser.org_name
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              update:
                "There was an error trying to update the user information. Please try again later."
            });
          });
      } else {
        res
          .status(500)
          .json({ update: "That user does not exist in our database" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ update: "Server error finding that user" });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  dbUsers.getUserById(id).then(foundUser => {
    if (foundUser) {
      dbUsers.deleteUser(id).then(deletedUser => {
        if (deletedUser) {
          res.status(200).json({
            message: `${foundUser.email} was deleted from the database.`
          });
        } else {
          res.status(400).json({
            delete: `There was an error trying to delete ${foundUser.email} from the database.`
          });
        }
      });
    } else {
      res.status(400).json({
        delete: "That user does not exist in our database."
      });
    }
  });
});

module.exports = router;
