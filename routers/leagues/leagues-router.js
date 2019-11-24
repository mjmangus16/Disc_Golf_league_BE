const router = require("express").Router();
const dbLeagues = require("./leagues-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");
const validateCreateLeague = require("../../validation/leagues/create");

// TYPE:  GET
// ROUTE:   /api/leagues/test
// DESCRIPTION: Tests the leagues router

router.get("/test", (req, res) => {
  res.send("The leagues router is working!");
});

// TYPE:  GET
// ROUTE:   /api/leagues/
// DESCRIPTION: Gets all data from all leagues

router.get("/", (req, res) => {
  dbLeagues
    .getLeagues()
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

// TYPE:  GET
// ROUTE:   /api/leagues/getLeagues
// DESCRIPTION: Gets specific data for all leagues

router.get("/getLeagues", (req, res) => {
  dbLeagues
    .getLeagues()
    .then(leagues => {
      if (leagues.length > 0) {
        let container = leagues.map(league => {
          return {
            league_id: league.league_id,
            name: league.name,
            year: league.year,
            type: league.type,
            state: league.state,
            zip: league.zip,
            active: league.active
          };
        });
        res.status(200).json(container);
      } else {
        res.status(500).json({ error: "There are no leagues available." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting leagues." });
    });
});

// TYPE:  GET
// ROUTE:   /api/leagues/id/:league_id
// DESCRIPTION: Gets all league data for a single league by id

router.get("/id/:league_id", (req, res) => {
  dbLeagues
    .getLeagueById(req.params.league_id)
    .then(league => {
      if (league) {
        league.schedule = JSON.parse(league.schedule);
        res.status(200).json(league);
      } else {
        res
          .status(500)
          .json({ error: "That league does not exist in our database." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting that league." });
    });
});

// TYPE:  GET
// ROUTE:   /api/leagues/owner
// DESCRIPTION: Gets all the leagues that a user is the owner of

router.get("/owner", restrictedAdmin, async (req, res) => {
  let leagues = await dbLeagues.getLeaguesByOwnerId(req.jwt.user_id);

  if (leagues) {
    res.status(200).json(leagues);
  } else {
    res.status(500).json({ error: "This user does not manage any leagues." });
  }
});

// TYPE:  GET
// ROUTE:   /api/leagues/user
// DESCRIPTION: Gets specific data for all the leagues a user is a member of

router.get("/user", restricted, async (req, res) => {
  const userLeagues = await dbLeagues.getLeaguesByUserId(req.jwt.user_id);

  if (userLeagues.length > 0) {
    const container = userLeagues.map(league => {
      return {
        league_id: league.league_id,
        name: league.name,
        year: league.year,
        type: league.type,
        state: league.state,
        zip: league.zip,
        active: league.active
      };
    });
    res.status(200).json(container);
  } else {
    res
      .status(500)
      .json({ error: "This user is not a member of any leagues." });
  }
});

// TYPE:  POST
// ROUTE:   /api/leagues/create
// DESCRIPTION: Creates a new league

router.post("/create", restrictedAdmin, (req, res) => {
  const newLeague = req.body;

  const { errors, isValid } = validateCreateLeague(newLeague);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  newLeague.relationship_id
    ? (newLeague.relationship_id = newLeague.relationship_id)
    : (newLeague.relationship_id = new Date().valueOf());

  newLeague.schedule
    ? (newLeague.schedule = JSON.stringify(newLeague.schedule))
    : (newLeague.schedule = null);

  newLeague.owner_id = req.jwt.user_id;

  dbLeagues
    .createLeague(newLeague)
    .then(addedLeague => {
      if (addedLeague) {
        res.status(200).json(addedLeague);
      } else {
        res.status(500).json({
          error:
            "There was an error trying to create that league. Please try again."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error creating that league." });
    });
});

// TYPE:  PUT
// ROUTE:   /api/leagues/update/:league_id
// DESCRIPTION: Updates a league if the user is the manager of that league

router.put("/update/:league_id", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbLeagues
        .updateLeague(req.params.league_id, { ...league, ...req.body })
        .then(success => {
          if (success) {
            res.status(200).json(success);
          } else {
            res
              .status(500)
              .json({ error: "There was an issue updating that league." });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error updating that league." });
        });
    } else {
      res.status(500).json({
        error: "Only the manager of this league can make updates to it."
      });
    }
  } else {
    res.status(500).json({
      error: "That league does not exist in our database"
    });
  }
});

// TYPE:  DELETE
// ROUTE:   /api/leagues/delete/:league_id
// DESCRIPTION: Deletes the league and all the related data for that league. ( members, rounds, participants )

router.delete("/delete/:league_id", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbLeagues
        .deleteLeague(req.params.league_id)
        .then(() => {
          res.status(200).json({
            success: `You have successfully deleted the ${league.name} league and all the data related to it.`
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "We were unable to delete this league, please try again."
          });
        });
    } else {
      res.status(500).json({
        error: "You must be the manager of the league to delete it."
      });
    }
  } else {
    res.status(500).json({
      error:
        "The league you are trying to delete does not exist in our database to be deleted."
    });
  }
});

module.exports = router;
