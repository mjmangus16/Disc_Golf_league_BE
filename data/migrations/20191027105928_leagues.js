exports.up = function(knex) {
  return knex.schema.createTable("leagues", leagues => {
    leagues.increments("league_id").unique();
    leagues.string("type");
    leagues.string("state");
    leagues.string("location");
    leagues.string("days");
    leagues.string("length");
    leagues.text("info", "longtext");
    leagues.boolean("active");
    leagues
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("leagues");
};
