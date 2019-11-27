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
    .insert(newSchedule, "round_id")
    .then(sched => {
      const [id] = sched;
      return getScheduleById(id);
    });
}

function updateSchedule(schedule_id, changes) {
  return db("schedules")
    .where({ schedule_id })
    .update(changes, "*");
}

function deleteSchedule(schedule_id) {
  return db("schedules")
    .where("schedule_id", schedule_id)
    .del();
}
