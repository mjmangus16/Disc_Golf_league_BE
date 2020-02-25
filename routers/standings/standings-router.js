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
// DESCRIPTION: Gets the standings data for each league

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
// ROUTE:   /api/leagueStandings/
// DESCRIPTION: Gets the standings data for each league

router.get("/leagueStandings", (req, res) => {
  dbStandings
    .getLeagueStandings()
    .then(standings => {
      if (standings.length > 0) {
        res.status(200).json(standings);
      } else {
        res
          .status(500)
          .json({ error: "There is no league standings data available" });
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
// DESCRIPTION: Get standings data by league id

router.get("/league/:league_id", async (req, res) => {
  const { league_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    dbStandings.getLeagueStandingsById(league_id).then(standings => {
      if (standings) {
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
    const standingsInfo = await dbStandings.getLeagueStandingsById(league_id);
    if (standingsInfo) {
      const participants = await dbParticipants.getParticipantsByLeague(
        league_id
      );
      if (participants.length > 0) {
        let data = await handlers(
          standingsInfo.name,
          league.type,
          participants
        );
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

// TYPE:  POST
// ROUTE:   /api/standings/add/league/:league_id/format/:standings_format_id
// DESCRIPTION: Connect a league to a standings format so they can start tracking their standings

router.post(
  "/add/league/:league_id/format/:standings_format_id",
  async (req, res) => {
    const { league_id, standings_format_id } = req.params;
    const league = await dbLeagues.getLeagueById(league_id);
    const standings_format = await dbStandings.getStandingsById(
      standings_format_id
    );

    if (league) {
      if (standings_format) {
        dbStandings
          .addLeagueStandings(league_id, standings_format_id)
          .then(leagueStandings => res.json(leagueStandings))
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error:
                "There was an error trying to connect that standings format to your league."
            });
          });
      } else {
        res.status(500).json({
          error: "We could not find that standings format"
        });
      }
    } else {
      res.status(500).json({
        error: "We could not find that league"
      });
    }
  }
);

// TYPE:  PUT
// ROUTE:   /api/standings/update/league/:league_id/format/:standings_format_id
// DESCRIPTION: Change the standings format that is connected to that league

router.put(
  "/update/league/:league_id/format/:standings_format_id",
  async (req, res) => {
    const { league_id, standings_format_id } = req.params;
    const league = await dbLeagues.getLeagueById(league_id);
    const standings_format = await dbStandings.getStandingsById(
      standings_format_id
    );

    if (league) {
      if (standings_format) {
        dbStandings
          .updateLeagueStandings(league_id, standings_format_id)
          .then(leagueStandings => res.json(leagueStandings))
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error:
                "There was an error trying to connect that standings format to your league."
            });
          });
      } else {
        res.status(500).json({
          error: "We could not find that standings format"
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
