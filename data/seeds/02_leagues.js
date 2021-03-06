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
          name: "WNY Singles League",
          year: 2017,
          type: "Singles",
          state: "New York",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          length: "November - March",
          active: false,
          contact:
            "Michael Mangus: 123-456-7890  / mike@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 1
        },
        {
          league_id: 2,
          relationship_id: 1573340119487,
          name: "WNY Random Doubles League",
          year: 2018,
          type: "Doubles",
          state: "New York",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          length: "November - March",
          active: false,
          contact:
            "Michael Mangus: 716-213-7444 / mjmangus16@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 1
        },
        {
          league_id: 3,
          relationship_id: 1573340119487,
          name: "WNY Winter Putting League",
          year: 2019,
          type: "Putting",
          state: "New York",
          zip: 14224,
          location: "Phatmans",
          days: "Tue",
          length: "November - March",
          active: true,
          contact:
            "Michael Mangus: 123-456-7890  / mike@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          description: "This is a combined singles and doubles putting league.",
          owner_id: 1
        },
        {
          league_id: 4,
          relationship_id: 1573342325931,
          name: "WNY Random Draw Doubles at ECP",
          year: 2019,
          type: "Doubles",
          state: "New York",
          zip: 14224,
          location: "Ellicot Creek Park",
          days: "Thu",
          length: "March - September",
          active: false,
          contact:
            "Michael Mangus: 123-456-7890  / mike@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          additional: "There will be no league on August 5th.",
          description:
            "This is a random draw doubles league held at Ellicot Creek DGC.",
          owner_id: 1
        },
        {
          league_id: 5,
          relationship_id: 1573342339202,
          name: "WNY Travel Singles",
          year: 2019,
          type: "Singles",
          state: "New York",
          zip: 14224,
          location: "Travel",
          days: "Wed",
          active: false,
          contact:
            "Michael Mangus: 123-456-7890  / mike@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",

          description:
            "This is a travel singles league. Courses played are Emery, Beaver Island State Park, Wilson-Tuscarora, Outwater, Joseph Davis and Chestnut Ridge.",
          owner_id: 1
        },
        {
          league_id: 6,
          relationship_id: 1573342339202,
          name: "WNY Travel Singles",
          year: 2020,
          type: "Singles",
          state: "New York",
          zip: 14224,
          location: "Travel",
          days: "Wed",
          active: true,
          contact:
            "Michael Mangus: 123-456-7890  / mike@yahoo.com, Jimmy Carman: 123-456-7890 / Jimmy@example.com",
          description:
            "This is a travel singles league. Courses played are Emery, Beaver Island State Park, Wilson-Tuscarora, Outwater, Joseph Davis and Chestnut Ridge.",
          owner_id: 1
        }
      ]);
    });
};
