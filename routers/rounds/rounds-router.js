const router = require("express").Router();
const dbRounds = require("./rounds-model");
const dbLeagues = require("../leagues/leagues-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

router.get("/test", (req, res) => {
  return res.send("The rounds router is working!");
});

// TYPE:  GET
// ROUTE:   /api/rounds/
// DESCRIPTION: Gets all rounds data

router.get("/", (req, res) => {
  dbRounds
    .getRounds()
    .then(rounds => {
      if (rounds.length > 0) {
        return res.status(200).json(rounds);
      } else {
        return res.status(500).json({ error: "There are no rounds available" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Server error getting rounds" });
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
          return res.status(200).json(container);
        } else {
          return res.status(500).json({
            error: "There have not been any rounds added to this league yet."
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Server error getting rounds" });
      });
  } else {
    return res.status(500).json({
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
            return res.status(200).json({
              success: `We succussfully added a round to the ${league.name} League.`
            });
          } else {
            return res.status(500).json({
              error:
                "We were unable to create a round for this league. Please try again later."
            });
          }
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({
            error:
              "We were unable to create a round for this league. Please try again later."
          });
        });
    } else {
      return res.status(500).json({
        error: "Only the manager of this league can add a round."
      });
    }
  } else {
    return res.status(500).json({
      error:
        "We can not add a round to a league that does not exist in our database."
    });
  }
});

// TYPE:  DELETE
// ROUTE:   /api/rounds/delete/:round_id/league/:league_id
// DESCRIPTION: deletes a round and all participants by round id

router.delete(
  "/delete/:round_id/league/:league_id",
  restrictedAdmin,
  async (req, res) => {
    const league = await dbLeagues.getLeagueById(req.params.league_id);
    const round = await dbRounds.getRoundById(req.params.round_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (round && round.league_id === league.league_id) {
          dbRounds
            .deleteRound(req.params.round_id)
            .then(() => {
              return res.status(200).json({
                success: `The round was successfully deleted from this league.`
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({
                error:
                  "There was an error trying to delete that round, please try again later."
              });
            });
        } else {
          return res.status(500).json({
            error: "That round does not exist in our database."
          });
        }
      } else {
        return res.status(500).json({
          error: "Only the manager of this league can delete a round."
        });
      }
    } else {
      return res.status(500).json({
        error:
          "We can not delete a round for a league that does not exist in our database."
      });
    }
  }
);

module.exports = router;
