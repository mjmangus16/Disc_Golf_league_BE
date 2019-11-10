const router = require("express").Router();
const db = require("./members-model");

router.get("/test", (req, res) => {
  res.send("The members router is working!");
});

router.get("/", (req, res) => {
  db.getMembers()
    .then(members => {
      if (members.length > 0) {
        res.status(200).json(getMembers);
      } else {
        res.status(500).json({ error: "There are no members available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting members" });
    });
});

module.exports = router;
