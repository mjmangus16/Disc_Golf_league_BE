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
  db.getLeagues()
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

router.get("/id/:league_id", (req, res) => {
  db.getLeagueById(req.params.league_id)
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

router.get("/owner", restrictedAdmin, async (req, res) => {
  let leagues = await db.getLeaguesByOwnerId(req.jwt.user_id);

  res.status(200).json(leagues);
});

router.get("/user", restricted, async (req, res) => {
  const userLeagues = await db.getLeaguesByUserId(req.jwt.user_id);

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
    res.status(500).json({ error: "Server error getting that users leagues." });
  }
});

router.post("/create", restrictedAdmin, (req, res) => {
  const newLeague = req.body;

  newLeague.relationship_id
    ? (newLeague.relationship_id = newLeague.relationship_id)
    : (newLeague.relationship_id = new Date().valueOf());

  newLeague.schedule
    ? (newLeague.schedule = JSON.stringify(newLeague.schedule))
    : (newLeague.schedule = null);

  newLeague.owner_id = req.jwt.user_id;

  db.createLeague(newLeague)
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

router.put("/update/:league_id", restrictedAdmin, async (req, res) => {
  const league = await db.getLeagueById(req.params.league_id);

  if (league) {
    if (league.owner_id === req.jwt.user_id) {
      db.updateLeague(req.params.league_id, { ...league, ...req.body })
        .then(updatedLeague => {
          res.status(200).json(updatedLeague);
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

router.delete("/delete/:league_id", restrictedAdmin, async (req, res) => {
  const league = await db.getLeagueById(req.params.league_id);

  if (league) {
    db.deleteLeague(req.params.league_id)
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
      error:
        "The league you are trying to delete does not exist in our database to be deleted."
    });
  }
});

module.exports = router;
