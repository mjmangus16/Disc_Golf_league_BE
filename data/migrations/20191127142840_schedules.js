exports.up = function(knex) {
  return knex.schema.createTable("schedules", schedules => {
    schedules.increments("schedule_id").unique();
    schedules.date("date").notNullable();
    schedules.string("all");
    schedules.string("rec");
    schedules.string("int");
    schedules.string("adv");
    schedules.string("open");
    schedules.integer("league_id").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("schedules");
};
