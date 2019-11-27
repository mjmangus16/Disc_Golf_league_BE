const router = require("express").Router();
const dbSchedules = require("./schedules-model");
const dbLeagues = require("../leagues/leagues-model");
const restricted = require("../../middleware/restricted");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

router.get("/test", (req, res) => {
  res.send("The schedules router is working!");
});

// TYPE:  GET
// ROUTE:   /api/schedules/
// DESCRIPTION: Gets all schedules data

router.get("/", (req, res) => {
  dbSchedules
    .getSchedules()
    .then(schedules => {
      if (schedules.length > 0) {
        res.status(200).json(schedules);
      } else {
        res.status(500).json({ error: "There is no schedule data available" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There was an issue grabbing the schedules" });
    });
});

// TYPE:  GET
// ROUTE:   /api/schedules/league/:league_id
// DESCRIPTION: Gets all schedules data by league id

router.get("/league/:league_id", (req, res) => {
  dbSchedules
    .getSchedulesByLeagueId(req.params.league_id)
    .then(schedules => {
      if (schedules.length > 0) {
        res.status(200).json(schedules);
      } else {
        res
          .status(500)
          .json({ error: "There is no schedule data for that league" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There was an issue grabbing the schedule data" });
    });
});

// TYPE:  POST
// ROUTE:   /api/schedules/league/:league_id
// DESCRIPTION: Adds a new schedule item to the database

router.post("/league/:league_id", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbSchedules
        .addSchedule(req.body)
        .then(schedule => {
          if (schedule) {
            res.status(200).json(schedule);
          } else {
            res.status(500).json({
              error: "There was an issue creating this schedule data"
            });
          }
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: "There was an issue creating this schedule data" });
        });
    } else {
      res.status(500).json({
        error: "Only the manager of this league can add schedule data"
      });
    }
  } else {
    res.status(500).json({
      error:
        "We can not add schedule data to a league that does not exist in our database"
    });
  }
});

// TYPE:  PUT
// ROUTE:   /api/schedules/league/:league_id/:schedule_id
// DESCRIPTION: Updates a schedule item

router.put(
  "/league/:league_id/:schedule_id",
  restrictedAdmin,
  async (req, res) => {
    const league = await dbLeagues.getLeagueById(req.params.league_id);
    const scheduleItem = await dbSchedules.getScheduleById(
      req.params.schedule_id
    );

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (scheduleItem) {
          dbSchedules
            .updateSchedule(req.params.schedule_id, req.body)
            .then(() => {
              res.status(200).json({ message: "success" });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an issue creating this schedule data"
              });
            });
        } else {
          res.status(500).json({
            error: "That schedule data does not exist in our database"
          });
        }
      } else {
        res.status(500).json({
          error: "Only the manager of this league can edit schedule data"
        });
      }
    } else {
      res.status(500).json({
        error:
          "We can not edit schedule data for a league that does not exist in our database"
      });
    }
  }
);

// TYPE:  DELETE
// ROUTE:   /api/schedules/league/:league_id/:schedule_id
// DESCRIPTION: Deletes a schedule item from the database

router.delete(
  "/league/:league_id/:schedule_id",
  restrictedAdmin,
  async (req, res) => {
    const league = await dbLeagues.getLeagueById(req.params.league_id);
    const scheduleItem = await dbSchedules.getScheduleById(
      req.params.schedule_id
    );

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (scheduleItem) {
          dbSchedules
            .deleteSchedule(req.params.schedule_id)
            .then(() => {
              res.status(200).json({ message: "success" });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an issue trying to delete that schedule data"
              });
            });
        } else {
          res.status(500).json({
            error: "That schedule data does not exist in our database"
          });
        }
      } else {
        res.status(500).json({
          error: "Only the manager of this league can delete schedule data"
        });
      }
    } else {
      res.status(500).json({
        error:
          "We can not delete schedule data for a league that does not exist in our database."
      });
    }
  }
);

module.exports = router;
