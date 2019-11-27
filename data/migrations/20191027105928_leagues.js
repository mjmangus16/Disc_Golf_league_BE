exports.up = function(knex) {
  return knex.schema.createTable("leagues", leagues => {
    leagues.increments("league_id").unique();
    leagues.bigInteger("relationship_id").notNullable();
    leagues.string("name").notNullable();
    leagues.integer("year").notNullable();
    leagues.string("type").notNullable();
    leagues.string("state").notNullable();
    leagues.integer("zip").notNullable();
    leagues.string("location").notNullable();
    leagues.string("days").notNullable();
    leagues.string("length");
    leagues
      .boolean("active")
      .defaultTo(true)
      .notNullable();
    leagues.text("contact", "longtext");
    leagues.text("additional", "longtext");
    leagues.text("description", "longtext");
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
