exports.up = function(knex) {
  return knex.schema.createTable("schedules", schedules => {
    schedules.increments("schedule_id").unique();
    schedules.string("date").notNullable();
    schedules.string("info");
    schedules.integer("league_id").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("schedules");
};
