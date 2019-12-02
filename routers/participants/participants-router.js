const router = require("express").Router();
const dbParticipants = require("./participants-model");
const dbLeagues = require("../leagues/leagues-model");
const dbMembers = require("../members/members-model");
const dbRounds = require("../rounds/rounds-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

router.get("/test", (req, res) => {
  res.send("The participants router is working!");
});

// TYPE:  GET
// ROUTE:   /api/participants/
// DESCRIPTION: Gets all participants

router.get("/", (req, res) => {
  dbParticipants
    .getParticipants()
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

// TYPE:  GET
// ROUTE:   /api/participants/league/:league_id/member/:member_id
// DESCRIPTION: Gets all participant records for a specific member of a league

router.get(
  "/league/:league_id/member/:member_id",
  restricted,
  async (req, res) => {
    const { league_id, member_id } = req.params;
    const member = await dbMembers.getMemberById(member_id);
    const league = await dbLeagues.getLeagueById(league_id);

    if (league) {
      if (member) {
        dbParticipants
          .getParticipantsByLeagueAndMember(league_id, member_id)
          .then(participants => {
            res.status(200).json(participants);
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "Server error getting that members rounds" });
          });
      } else {
        res.status(500).json({ error: "We could not find that member" });
      }
    } else {
      res.status(500).json({ error: "We could not find that league" });
    }
  }
);

// TYPE:  GET
// ROUTE:   /api/participants/league/:league_id/round/:round_id
// DESCRIPTION: Gets all participants for a round

router.get(
  "/league/:league_id/round/:round_id",
  restricted,
  async (req, res) => {
    const { league_id, round_id } = req.params;
    const round = await dbRounds.getRoundById(round_id);
    const league = await dbLeagues.getLeagueById(league_id);

    if (league) {
      if (round) {
        dbParticipants
          .getParticipantsByRoundId(round_id)
          .then(rounds => {
            res.status(200).json(rounds);
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "Server error trying to get participants" });
          });
      } else {
        res.status(500).json({ error: "We could not find that round" });
      }
    } else {
      res.status(500).json({ error: "We could not find that league" });
    }
  }
);

router.put(
  "/league/:league_id/round/:round_id/member/:member_id/participant/:participant_id",
  restrictedAdmin,
  async (req, res) => {
    const { league_id, round_id, member_id, participant_id } = req.params;
    const changes = req.body;
    const round = await dbRounds.getRoundById(round_id);
    const league = await dbLeagues.getLeagueById(league_id);
    const member = await dbMembers.getMemberById(member_id);
    const participant = await dbParticipants.getParticipantById(participant_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (round) {
          if (member) {
            if (
              participant &&
              participant.member_id === member.member_id &&
              participant.round_id === round.round_id
            ) {
              dbParticipants
                .updateParticipant(participant_id, changes)
                .then(success => {
                  if (success) {
                    res.status(200).json(success);
                  } else {
                    res.status(500).json({
                      error: "There was an issue updating that participant"
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  res
                    .status(500)
                    .json({ error: "Server error updating that participant" });
                });
            } else {
              res.status(500).json({
                error: "We could not find that participant"
              });
            }
          } else {
            res.status(500).json({
              error: "We could not find that member"
            });
          }
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
      res.status(500).json({ error: "We could not find that league" });
    }
  }
);

router.delete(
  "/league/:league_id/round/:round_id/member/:member_id/participant/:participant_id",
  restrictedAdmin,
  async (req, res) => {
    const { league_id, round_id, member_id, participant_id } = req.params;
    const round = await dbRounds.getRoundById(round_id);
    const league = await dbLeagues.getLeagueById(league_id);
    const member = await dbMembers.getMemberById(member_id);
    const participant = await dbParticipants.getParticipantById(participant_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (round) {
          if (member) {
            if (
              participant &&
              participant.member_id === member.member_id &&
              participant.round_id === round.round_id
            ) {
              dbParticipants
                .deleteParticipant(participant_id)
                .then(() => {
                  res.status(200).json({
                    success: `Successfully deleted that participant`
                  });
                })
                .catch(err => {
                  console.log(err);
                  res
                    .status(500)
                    .json({ error: "Server error deleting that participant" });
                });
            } else {
              res.status(500).json({
                error: "We could not find that participant"
              });
            }
          } else {
            res.status(500).json({
              error: "We could not find that member"
            });
          }
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
      res.status(500).json({ error: "We could not find that league" });
    }
  }
);

module.exports = router;
