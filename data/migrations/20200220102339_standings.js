exports.up = function(knex) {
  return knex.schema.createTable("standings", standings => {
    standings.increments("standings_id").unique();
    standings
      .integer("league_id")
      .unique()
      .unsigned()
      .notNullable()
      .references("league_id")
      .inTable("leagues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    standings
      .integer("standings_format_id")
      .unsigned()
      .notNullable()
      .references("standings_format_id")
      .inTable("standings_format")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("standings");
};
