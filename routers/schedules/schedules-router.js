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

router.get("/league/:league_id", async (req, res) => {
  const { league_id } = req.params;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    dbSchedules
      .getSchedulesByLeagueId(league_id)
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
  } else {
    res.status(500).json({ error: "We could not find that league" });
  }
});

// TYPE:  POST
// ROUTE:   /api/schedules/league/:league_id
// DESCRIPTION: Adds a new schedule item to the database

router.post("/league/:league_id", restrictedAdmin, async (req, res) => {
  const { league_id } = req.params;
  const newSchedule = req.body;
  const league = await dbLeagues.getLeagueById(league_id);

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbSchedules
        .addSchedule(newSchedule)
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
        error: "You do not have admin privileges for this league"
      });
    }
  } else {
    res.status(500).json({
      error: "We could not find that league"
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
    const { league_id, schedule_id } = req.params;
    const changes = req.body;
    const league = await dbLeagues.getLeagueById(league_id);
    const scheduleItem = await dbSchedules.getScheduleById(schedule_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (scheduleItem) {
          dbSchedules
            .updateSchedule(schedule_id, changes, league_id)
            .then(schedule => {
              res.status(200).json(schedule);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an issue updating this schedule data"
              });
            });
        } else {
          res.status(500).json({
            error: "We could not find that schedule data"
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

// TYPE:  DELETE
// ROUTE:   /api/schedules/league/:league_id/:schedule_id
// DESCRIPTION: Deletes a schedule item from the database

router.delete(
  "/league/:league_id/:schedule_id",
  restrictedAdmin,
  async (req, res) => {
    const { league_id, schedule_id } = req.params;
    const league = await dbLeagues.getLeagueById(league_id);
    const scheduleItem = await dbSchedules.getScheduleById(schedule_id);

    if (league) {
      if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
        if (scheduleItem) {
          dbSchedules
            .deleteSchedule(schedule_id, league_id)
            .then(schedule => {
              res.status(200).json(schedule);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an issue deleting that schedule data"
              });
            });
        } else {
          res.status(500).json({
            error: "We could not find that schedule data"
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
