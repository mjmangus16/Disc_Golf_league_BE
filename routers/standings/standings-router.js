const router = require("express").Router();
const secrets = require("../../secrets");
const dbStandings = require("./standings-model");
const dbLeagues = require("../leagues/leagues-model");
const dbParticipants = require("../participants/participants-model");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

const handlers = require("./handlers");

router.get("/test", (req, res) => {
  res.send("The standings router is working!");
});

// TYPE:  GET
// ROUTE:   /api/standings/formats/
// DESCRIPTION: Gets all the formats available

router.get("/formats", (req, res) => {
  dbStandings
    .getFormats()
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
// ROUTE:   /api/standings/league/
// DESCRIPTION: Gets the standings data for each league

router.get("/league/", (req, res) => {
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
// ROUTE:   /api/standings/league/:league_id/results
// DESCRIPTION: Get standings results by league

router.get("/league/:league_id/results", async (req, res) => {
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
// ROUTE:   /api/standings/league/:league_id/add/format/:standings_format_id
// DESCRIPTION: Connect a league to a standings format so they can start tracking their standings

router.post(
  "/league/:league_id/add/format/:standings_format_id",
  checkLeagueOwner,
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
// ROUTE:   /api/standings/league/:league_id/update/format/:standings_format_id
// DESCRIPTION: Change the standings format that is connected to that league

router.put(
  "/league/:league_id/update/format/:standings_format_id",
  checkLeagueOwner,
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
          .then(leagueStandings => res.status(200).json(leagueStandings))
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

// TYPE:  DELETE
// ROUTE:   /api/standings/league/:league_id/delete
// DESCRIPTION: Remove that leagues standings connection to a format

router.delete(
  "/league/:league_id/delete",
  checkLeagueOwner,
  async (req, res) => {
    const { league_id } = req.params;
    const league = await dbLeagues.getLeagueById(league_id);
    const standings = await dbStandings.getLeagueStandingsById(league_id);

    if (league) {
      if (standings) {
        dbStandings.deleteLeagueStandings(standings.standings_id).then(() =>
          res.status(200).json({
            message: "Successfully removed that leagues standings format"
          })
        );
      } else {
        res.status(500).json({
          error: "We could not find any standings connections for this league"
        });
      }
    } else {
      res.status(500).json({
        error: "We could not find that league"
      });
    }
  }
);

// TYPE:  POST
// ROUTE:   /api/standings/format/add/:pw
// DESCRIPTION: Add a new standings format to the database

router.post("/formats/add/:pw", (req, res) => {
  const { pw } = req.params;
  const data = req.body;

  if (pw === secrets.routePW) {
    dbStandings
      .addStandingsFormat(data)
      .then(() =>
        res.status(200).json({ message: "Successfully added that format." })
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error trying to add that format to the database"
        });
      });
  } else {
    res.status(500).json({
      error: "You do not have access to this route"
    });
  }
});

// TYPE:  PUT
// ROUTE:   /api/standings/formats/update/format/:standings_format_id/:pw
// DESCRIPTION: Update an existing standings format

router.put("/formats/update/format/:standings_format_id/:pw", (req, res) => {
  const { standings_format_id, pw } = req.params;
  const data = req.body;

  if (pw === secrets.routePW) {
    dbStandings
      .updateStandingsFormat(standings_format_id, data)
      .then(updated => res.status(200).json(updated))
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error trying to add that format to the database"
        });
      });
  } else {
    res.status(500).json({
      error: "You do not have access to this route"
    });
  }
});

// TYPE:  DELETE
// ROUTE:   /api/standings/formats/delete/format/:standings_format_id/:pw
// DESCRIPTION: Delete an existing standings format

router.delete("/formats/delete/format/:standings_format_id/:pw", (req, res) => {
  const { standings_format_id, pw } = req.params;

  if (pw === secrets.routePW) {
    dbStandings
      .deleteStandingsFormat(standings_format_id)
      .then(() =>
        res.status(200).json({ message: "Successfully deleted that format." })
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error trying to add that format to the database"
        });
      });
  } else {
    res.status(500).json({
      error: "You do not have access to this route"
    });
  }
});

module.exports = router;
