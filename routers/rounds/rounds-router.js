const router = require("express").Router();
const dbRounds = require("./rounds-model");

router.get("/test", (req, res) => {
  res.send("The rounds router is working!");
});

// TYPE:  GET
// ROUTE:   /api/rounds/
// DESCRIPTION: Gets all rounds data

router.get("/", (req, res) => {
  dbRounds
    .getRounds()
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

// TYPE:  GET
// ROUTE:   /api/rounds/league/:league_id
// DESCRIPTION: Gets all rounds data for a specific league

router.get("/league/:league_id", (req, res) => {
  dbRounds
    .getRoundsByLeague(req.params.league_id)
    .then(rounds => {
      if (rounds) {
        const container = rounds.map(round => {
          return {
            round_id: round.round_id,
            date: round.date,
            type: round.type,
            round_num: round.round_num
          };
        });
        res.status(200).json(container);
      } else {
        res.status(500).json({
          error: "There have not been any rounds added to this league yet."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting rounds" });
    });
});

module.exports = router;
