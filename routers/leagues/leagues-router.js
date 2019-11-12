const router = require("express").Router();
const db = require("./leagues-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");

router.get("/test", (req, res) => {
  res.send("The leagues router is working!");
});

router.get("/", (req, res) => {
  db.getLeagues()
    .then(leagues => {
      if (leagues.length > 0) {
        res.status(200).json(leagues);
      } else {
        res.status(500).json({ error: "There are no leagues available." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting leagues." });
    });
});

router.get("/getLeagues", (req, res) => {
  db.getLeagues().then(leagues => {
    if (leagues.length > 0) {
      let container = leagues.map(league => {
        return {
          league_id: league.league_id,
          league_name: league.name,
          league_type: league.type,
          league_state: league.state,
          league_zip: league.zip,
          league_active: league.active
        };
      });
      res.status(200).json(container);
    } else {
      res.status(500).json({ error: "There are no leagues available." });
    }
  });
});

router.get("/id/:league_id", (req, res) => {
  db.getLeagueById(req.params.league_id).then(league => {
    if (league) {
      league.schedule = JSON.parse(league.schedule);
      res.status(200).json(league);
    } else {
      res
        .status(500)
        .json({ error: "That league does not exist in our database." });
    }
  });
});

router.post("/create", restrictedAdmin, (req, res) => {
  const newLeague = req.body;

  newLeague.relationship_id
    ? (newLeague.relationship_id = newLeague.relationship_id)
    : (newLeague.relationship_id = new Date().valueOf());

  newLeague.owner_id = req.jwt.user_id;

  console.log(newLeague);

  // db.createLeague(newLeague).then(league => {
  //   if (league) {
  //     res.status(200).json(league);
  //   } else {
  //     res.status(500).json({
  //       error:
  //         "There was an error trying to create that league. Please try again."
  //     });
  //   }
  // });
});

module.exports = router;
