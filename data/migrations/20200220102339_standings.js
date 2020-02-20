exports.up = function(knex) {
  return knex.schema.createTable("standings", standings => {
    standings.increments("standings_id").unique();
    standings.integer("members_count");
    standings.string("type");
    standings
      .integer("league_id")
      .unsigned()
      .notNullable()
      .references("league_id")
      .inTable("leagues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("standings");
};
