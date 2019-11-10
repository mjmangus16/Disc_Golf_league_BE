const router = require("express").Router();
const db = require("./leagues-model");

router.get("/test", (req, res) => {
  res.send("The leagues router is working!");
});

router.get("/", (req, res) => {
  db.getLeagues()
    .then(leagues => {
      if (leagues.length > 0) {
        res.status(200).json(leagues);
      } else {
        res.status(500).json({ error: "There are no leagues available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting leagues" });
    });
});

module.exports = router;
