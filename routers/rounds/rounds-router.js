const router = require("express").Router();
const dbRounds = require("./rounds-model");
const dbLeagues = require("../leagues/leagues-model");
const dbParticipants = require("../participants/participants-model");
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
  const { league_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);
  const participants_array = await dbParticipants.getParticipantsByLeague(league_id)
  if (league) {
    dbRounds
      .getRoundsByLeague(league_id)
      .then(rounds => {
        if (rounds.length > 0) {
          const container = rounds.map(round => {
            return {
              round_id: round.round_id,
              date: round.date,
              type: round.type,
              round_num: round.round_num,
              participants: participants_array.filter(x => x.round_id == round.round_id).length
            };
          });
          res.status(200).json(container);
        } else {
          res.status(500).json({
            error: "We could not find any rounds for this league"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting rounds" });
      });
  } else {
    res.status(500).json({
      error: "We could not find that league"
    });
  }
});

// TYPE:  GET
// ROUTE:   /api/rounds/league/:league_id/round/:round_id
// DESCRIPTION: Gets a single round by round id

router.get("/league/:league_id/round/:round_id", async (req, res) => {
  const { league_id, round_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);
  const round = await dbRounds.getRoundById(round_id);

  if (league) {
    if (round) {
      dbParticipants
        .getParticipantsByRoundId(round_id)
        .then(parts => {
          res
            .status(200)
            .json({ league: league.name, ...round, participants: parts });
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: "Server error trying to get participants" });
        });
    } else {
      res.status(500).json({
        error: "We could not find that round"
      });
    }
  } else {
    res.status(500).json({
      error: "We could not find that league"
    });
  }
});

// TYPE:  POST
// ROUTE:   /api/rounds/add/league/:league_id
// DESCRIPTION: Adds a round to the league

router.post("/add/league/:league_id", restrictedAdmin, async (req, res) => {
  const { league_id } = req.params;
  const newRound = req.body;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbRounds
        .addRound(newRound, league_id)
        .then(success => {
          if (success) {
            res.status(200).json(success);
          } else {
            res.status(500).json({
              error: "There was an issue creating this round"
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Server error creating this round"
          });
        });
    } else {
      res.status(500).json({
        error: "You do not have admin privileges for this league"
      });
    }
  } else {
    res.status(500).json({
      error: "We could not find that league"
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
    const { league_id, round_id } = req.params;
    const league = await dbLeagues.getLeagueById(league_id);
    const round = await dbRounds.getRoundById(round_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (round && round.league_id === league.league_id) {
          dbRounds
            .deleteRound(round_id)
            .then(() => {
              res.status(200).json({
                success: `The round was successfully deleted from this league.`
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an issue deleting that round"
              });
            });
        } else {
          res.status(500).json({
            error: "We could not find that round"
          });
        }
      } else {
        res.status(500).json({
          error: "You do not have admin privileges for this league"
        });
      }
    } else {
      res.status(500).json({
        error: "We could not find that league"
      });
    }
  }
);

// TYPE:  UPDATE
// ROUTE:   /api/rounds/update/:round_id/league/:league_id
// DESCRIPTION: updates a round by round id

router.put(
  "/update/:round_id/league/:league_id",
  restrictedAdmin,
  async (req, res) => {
    const { league_id, round_id } = req.params;
    const changes = req.body;
    const league = await dbLeagues.getLeagueById(league_id);
    const round = await dbRounds.getRoundById(round_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (round && round.league_id === league.league_id) {
          dbRounds
            .updateRound(round_id, changes)
            .then(success => {
              if (success) {
                res.status(200).json(success);
              } else {
                res
                  .status(500)
                  .json({ error: "There was an issue updating that round" });
              }
            })
            .catch(err => {
              console.log(err);
              res
                .status(500)
                .json({ error: "Server error updating that round" });
            });
        } else {
          res.status(500).json({
            error: "We could not find that round"
          });
        }
      } else {
        res.status(500).json({
          error: "You do not have admin privileges for this league"
        });
      }
    } else {
      res.status(500).json({
        error: "We could not find that league"
      });
    }
  }
);

module.exports = router;
