const router = require("express").Router();
const dbRounds = require("./rounds-model");
const dbLeagues = require("../leagues/leagues-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

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

router.get("/league/:league_id", async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  if (league) {
    dbRounds
      .getRoundsByLeague(req.params.league_id)
      .then(rounds => {
        if (rounds.length > 0) {
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
  } else {
    res.status(500).json({
      error:
        "We can not get rounds for a league that does not exist in our database."
    });
  }
});

// TYPE:  POST
// ROUTE:   /api/rounds/add/league/:league_id
// DESCRIPTION: Adds a round to the league

router.post("/add/league/:league_id", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbRounds
        .addRound(req.body, req.params.league_id)
        .then(success => {
          if (success) {
            res.status(200).json({
              success: `We succussfully added a round to the ${league.name} League.`
            });
          } else {
            res.status(500).json({
              error:
                "We were unable to create a round for this league. Please try again later."
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error:
              "We were unable to create a round for this league. Please try again later."
          });
        });
    } else {
      res.status(500).json({
        error: "Only the manager of this league can add a round."
      });
    }
  } else {
    res.status(500).json({
      error:
        "We can not add a round to a league that does not exist in our database."
    });
  }
});

module.exports = router;
