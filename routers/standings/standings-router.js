const router = require("express").Router();

const dbStandings = require("./standings-model");
const dbLeagues = require("../leagues/leagues-model");
const dbParticipants = require("../participants/participants-model");

const handlers = require("./handlers");

router.get("/test", (req, res) => {
  res.send("The standings router is working!");
});

// TYPE:  GET
// ROUTE:   /api/standings/
// DESCRIPTION: Gets all standings data

router.get("/", (req, res) => {
  dbStandings
    .getStandings()
    .then(standings => {
      if (standings.length > 0) {
        res.status(200).json(standings);
      } else {
        res.status(500).json({ error: "There is no standings data available" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There was an issue grabbing the standings" });
    });
});

// TYPE:  GET
// ROUTE:   /api/standings/league/:league_id
// DESCRIPTION: Get standings data by league

router.get("/league/:league_id", async (req, res) => {
  const { league_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    dbStandings.getStandingsByLeagueId(league_id).then(standings => {
      if (standings.length > 0) {
        res.status(200).json(standings);
      } else {
        res
          .status(500)
          .json({ error: "This league has not set their standings yet" });
      }
    });
  } else {
    res.status(500).json({
      error: "We could not find that league"
    });
  }
});

// TYPE:  GET
// ROUTE:   /api/standings/results/league/:league_id
// DESCRIPTION: Get standings results by league

router.get("/results/league/:league_id/", async (req, res) => {
  const { league_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    const standingsInfo = await dbStandings.getStandingsByLeagueId(league_id);
    if (standingsInfo) {
      const participants = await dbParticipants.getParticipantsByLeague(
        league_id
      );
      if (participants.length > 0) {
        let data = await handlers(standingsInfo, league.type, participants);
        res.status(200).json(data);
      } else {
        res.status(500).json({
          error:
            "Once a round is entered into the league, you can get standings results"
        });
      }
    } else {
      res.status(500).json({
        error: "This league has not set their standings yet"
      });
    }
  } else {
    res.status(500).json({
      error: "We could not find that league"
    });
  }
});

module.exports = router;
