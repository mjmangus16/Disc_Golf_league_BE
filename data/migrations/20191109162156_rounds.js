exports.up = function(knex) {
  return knex.schema.createTable("rounds", rounds => {
    rounds.increments("round_id").unique();
    rounds
      .integer("league_id")
      .unsigned()
      .notNullable()
      .references("league_id")
      .inTable("leagues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    rounds.date("date").notNullable();
    rounds.integer("round_num").notNullable();
    rounds.string("type");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("rounds");
};
