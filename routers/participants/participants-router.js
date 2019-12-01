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

module.exports = router;
