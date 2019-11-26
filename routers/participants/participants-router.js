const router = require("express").Router();
const db = require("./participants-model");

router.get("/test", (req, res) => {
  res.send("The participants router is working!");
});

router.get("/", (req, res) => {
  db.getParticipants()
    .then(participants => {
      if (participants.length > 0) {
        res.status(200).json(participants);
      } else {
        res.status(500).json({ error: "There are no participants available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting participants" });
    });
});

router.get("/league/:league_id/member/:member_id", (req, res) => {
  const { league_id, member_id } = req.params;
  db.getParticipantsByLeagueAndMember(league_id, member_id)
    .then(participants => {
      res.status(200).json(participants);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Server error getting that members rounds" });
    });
});

module.exports = router;
