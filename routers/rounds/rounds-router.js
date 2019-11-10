const router = require("express").Router();
const db = require("./rounds-model");

router.get("/test", (req, res) => {
  res.send("The rounds router is working!");
});

router.get("/", (req, res) => {
  db.getRounds()
    .then(rounds => {
      if (rounds.length > 0) {
        res.status(200).json(rounds);
      } else {
        res.status(500).json({ error: "There are no rounds available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting rounds" });
    });
});

module.exports = router;
