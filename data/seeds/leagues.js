exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("leagues")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("leagues").insert([
        {
          league_id: 1,
          relationship_id: 1573340119487,
          name: "WNY Winter Putting League",
          year: 2017,
          type: "Putting",
          state: "NY",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          active: false,
          contact:
            "Michael Mangus: 716-213-7444 / mjmangus16@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          additional: "",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 0
        },
        {
          league_id: 2,
          relationship_id: 1573340119487,
          name: "WNY Winter Putting League",
          year: 2018,
          type: "Putting",
          state: "NY",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          active: false,
          contact:
            "Michael Mangus: 716-213-7444 / mjmangus16@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          additional: "",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 0
        },
        {
          league_id: 3,
          relationship_id: 1573340119487,
          name: "WNY Winter Putting League",
          year: 2019,
          type: "Putting",
          state: "NY",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          active: true,
          contact:
            "Michael Mangus: 716-213-7444 / mjmangus16@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          additional: "",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 0
        }
      ]);
    });
};
