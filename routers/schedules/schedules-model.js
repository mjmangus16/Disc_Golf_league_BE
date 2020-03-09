const db = require("../../data/dbConfig");

module.exports = {
  getSchedules,
  getSchedulesByLeagueId,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule
};

function getSchedules() {
  return db("schedules").select("*");
}

function getSchedulesByLeagueId(league_id) {
  return db("schedules").where("league_id", league_id);
}

function getScheduleById(schedule_id) {
  return db("schedules")
    .where("schedule_id", schedule_id)
    .first();
}

function addSchedule(newSchedule) {
  return db("schedules")
    .insert(newSchedule, "schedule_id")
    .then(sched => {
      const [id] = sched;
      return getScheduleById(id);
    });
}

function updateSchedule(schedule_id, changes, league_id) {
  return db("schedules")
    .where({ schedule_id })
    .update(changes, "*")
    .then(() => {
      return getSchedulesByLeagueId(league_id);
    });
}

function deleteSchedule(schedule_id, league_id) {
  return db("schedules")
    .where("schedule_id", schedule_id)
    .del()
    .then(() => {
      return getSchedulesByLeagueId(league_id);
    });
}
