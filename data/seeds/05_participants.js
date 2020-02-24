exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("participants")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("participants").insert([
        {
          participant_id: 1,
          member_id: 1,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 2,
          member_id: 1,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 3,
          member_id: 1,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 4,
          member_id: 1,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 5,
          member_id: 1,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 6,
          member_id: 1,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 7,
          member_id: 1,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 8,
          member_id: 1,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 9,
          member_id: 2,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 10,
          member_id: 2,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 11,
          member_id: 2,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 12,
          member_id: 2,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 13,
          member_id: 2,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 14,
          member_id: 2,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 15,
          member_id: 2,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 16,
          member_id: 2,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 17,
          member_id: 3,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 18,
          member_id: 3,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 19,
          member_id: 3,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 20,
          member_id: 3,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 21,
          member_id: 3,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 22,
          member_id: 3,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 23,
          member_id: 3,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 24,
          member_id: 3,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 25,
          member_id: 4,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 26,
          member_id: 4,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 27,
          member_id: 4,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 28,
          member_id: 4,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 29,
          member_id: 4,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 30,
          member_id: 4,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 31,
          member_id: 4,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 32,
          member_id: 4,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 33,
          member_id: 5,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 34,
          member_id: 5,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 35,
          member_id: 5,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 36,
          member_id: 5,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 37,
          member_id: 5,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 38,
          member_id: 5,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 39,
          member_id: 5,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 40,
          member_id: 5,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 41,
          member_id: 6,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 42,
          member_id: 6,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 43,
          member_id: 6,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 44,
          member_id: 6,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 45,
          member_id: 6,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 46,
          member_id: 6,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 47,
          member_id: 6,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 48,
          member_id: 6,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 49,
          member_id: 7,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 50,
          member_id: 7,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 51,
          member_id: 7,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 52,
          member_id: 7,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 53,
          member_id: 7,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 54,
          member_id: 7,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 55,
          member_id: 7,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 56,
          member_id: 7,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 57,
          member_id: 8,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 58,
          member_id: 8,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 59,
          member_id: 8,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 60,
          member_id: 8,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 61,
          member_id: 8,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 62,
          member_id: 8,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 63,
          member_id: 8,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 64,
          member_id: 8,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 65,
          member_id: 9,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 66,
          member_id: 9,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 67,
          member_id: 9,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 68,
          member_id: 9,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 69,
          member_id: 9,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 70,
          member_id: 9,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 71,
          member_id: 9,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 72,
          member_id: 9,
          round_id: 8,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 73,
          member_id: 10,
          round_id: 1,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 74,
          member_id: 10,
          round_id: 2,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 75,
          member_id: 10,
          round_id: 3,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 76,
          member_id: 10,
          round_id: 4,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 77,
          member_id: 10,
          round_id: 5,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 78,
          member_id: 10,
          round_id: 6,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 79,
          member_id: 10,
          round_id: 7,
          score: 55,
          league_id: 1
        },
        {
          participant_id: 80,
          member_id: 10,
          round_id: 8,
          score: 55,
          league_id: 1
        },

        {
          participant_id: 81,
          member_id: 11,
          round_id: 9,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 82,
          member_id: 11,
          round_id: 10,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 83,
          member_id: 11,
          round_id: 11,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 84,
          member_id: 11,
          round_id: 12,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 85,
          member_id: 11,
          round_id: 13,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 86,
          member_id: 11,
          round_id: 14,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 87,
          member_id: 11,
          round_id: 15,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 88,
          member_id: 11,
          round_id: 16,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 89,
          member_id: 12,
          round_id: 9,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 90,
          member_id: 12,
          round_id: 10,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 91,
          member_id: 12,
          round_id: 11,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 92,
          member_id: 12,
          round_id: 12,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 93,
          member_id: 12,
          round_id: 13,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 94,
          member_id: 12,
          round_id: 14,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 95,
          member_id: 12,
          round_id: 15,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 96,
          member_id: 12,
          round_id: 16,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 97,
          member_id: 13,
          round_id: 9,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 98,
          member_id: 13,
          round_id: 10,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 99,
          member_id: 13,
          round_id: 11,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 100,
          member_id: 13,
          round_id: 12,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 101,
          member_id: 13,
          round_id: 13,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 102,
          member_id: 13,
          round_id: 14,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 103,
          member_id: 13,
          round_id: 15,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 104,
          member_id: 13,
          round_id: 16,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 105,
          member_id: 14,
          round_id: 9,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 106,
          member_id: 14,
          round_id: 10,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 107,
          member_id: 14,
          round_id: 11,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 108,
          member_id: 14,
          round_id: 12,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 109,
          member_id: 14,
          round_id: 13,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 110,
          member_id: 14,
          round_id: 14,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 111,
          member_id: 14,
          round_id: 15,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 112,
          member_id: 14,
          round_id: 16,
          score: 56,
          league_id: 2
        },
        {
          participant_id: 113,
          member_id: 15,
          round_id: 9,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 114,
          member_id: 15,
          round_id: 10,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 115,
          member_id: 15,
          round_id: 11,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 116,
          member_id: 15,
          round_id: 12,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 117,
          member_id: 15,
          round_id: 13,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 118,
          member_id: 15,
          round_id: 14,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 119,
          member_id: 15,
          round_id: 15,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 120,
          member_id: 15,
          round_id: 16,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 121,
          member_id: 16,
          round_id: 9,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 122,
          member_id: 16,
          round_id: 10,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 123,
          member_id: 16,
          round_id: 11,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 124,
          member_id: 16,
          round_id: 12,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 125,
          member_id: 16,
          round_id: 13,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 126,
          member_id: 16,
          round_id: 14,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 127,
          member_id: 16,
          round_id: 15,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 128,
          member_id: 16,
          round_id: 16,
          score: 57,
          league_id: 2
        },
        {
          participant_id: 129,
          member_id: 17,
          round_id: 9,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 130,
          member_id: 17,
          round_id: 10,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 131,
          member_id: 17,
          round_id: 11,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 132,
          member_id: 17,
          round_id: 12,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 133,
          member_id: 17,
          round_id: 13,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 134,
          member_id: 17,
          round_id: 14,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 135,
          member_id: 17,
          round_id: 15,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 136,
          member_id: 17,
          round_id: 16,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 137,
          member_id: 18,
          round_id: 9,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 138,
          member_id: 18,
          round_id: 10,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 139,
          member_id: 18,
          round_id: 11,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 140,
          member_id: 18,
          round_id: 12,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 141,
          member_id: 18,
          round_id: 13,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 142,
          member_id: 18,
          round_id: 14,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 143,
          member_id: 18,
          round_id: 15,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 144,
          member_id: 18,
          round_id: 16,
          score: 58,
          league_id: 2
        },
        {
          participant_id: 145,
          member_id: 19,
          round_id: 9,
          score: 59,
          league_id: 2
        },
        {
          participant_id: 146,
          member_id: 19,
          round_id: 10,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 147,
          member_id: 19,
          round_id: 11,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 148,
          member_id: 19,
          round_id: 12,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 149,
          member_id: 19,
          round_id: 13,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 150,
          member_id: 19,
          round_id: 14,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 151,
          member_id: 19,
          round_id: 15,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 152,
          member_id: 19,
          round_id: 16,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 153,
          member_id: 20,
          round_id: 9,
          score: 59,
          league_id: 2
        },
        {
          participant_id: 154,
          member_id: 20,
          round_id: 10,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 155,
          member_id: 20,
          round_id: 11,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 156,
          member_id: 20,
          round_id: 12,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 157,
          member_id: 20,
          round_id: 13,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 158,
          member_id: 20,
          round_id: 14,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 159,
          member_id: 20,
          round_id: 15,
          score: 55,
          league_id: 2
        },
        {
          participant_id: 160,
          member_id: 20,
          round_id: 16,
          score: 55,
          league_id: 2
        }

        // { participant_id: 161, member_id: 21, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 162, member_id: 21, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 163, member_id: 21, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 164, member_id: 21, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 165, member_id: 21, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 166, member_id: 21, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 167, member_id: 21, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 168, member_id: 21, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 169, member_id: 22, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 170, member_id: 22, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 171, member_id: 22, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 172, member_id: 22, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 173, member_id: 22, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 174, member_id: 22, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 175, member_id: 22, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 176, member_id: 22, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 177, member_id: 23, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 178, member_id: 23, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 179, member_id: 23, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 180, member_id: 23, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 181, member_id: 23, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 182, member_id: 23, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 183, member_id: 23, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 184, member_id: 23, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 185, member_id: 24, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 186, member_id: 24, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 187, member_id: 24, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 188, member_id: 24, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 189, member_id: 24, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 190, member_id: 24, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 191, member_id: 24, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 192, member_id: 24, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 193, member_id: 25, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 194, member_id: 25, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 195, member_id: 25, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 196, member_id: 25, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 197, member_id: 25, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 198, member_id: 25, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 199, member_id: 25, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 200, member_id: 25, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 201, member_id: 26, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 202, member_id: 26, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 203, member_id: 26, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 204, member_id: 26, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 205, member_id: 26, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 206, member_id: 26, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 207, member_id: 26, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 208, member_id: 26, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 209, member_id: 27, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 210, member_id: 27, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 211, member_id: 27, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 212, member_id: 27, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 213, member_id: 27, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 214, member_id: 27, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 215, member_id: 27, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 216, member_id: 27, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 217, member_id: 28, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 218, member_id: 28, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 219, member_id: 28, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 220, member_id: 28, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 221, member_id: 28, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 222, member_id: 28, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 223, member_id: 28, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 224, member_id: 28, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 225, member_id: 29, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 226, member_id: 29, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 227, member_id: 29, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 228, member_id: 29, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 229, member_id: 29, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 230, member_id: 29, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 231, member_id: 29, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 232, member_id: 29, round_id: 24, score: 55, league_id: 3 },
        // { participant_id: 233, member_id: 30, round_id: 17, score: 55, league_id: 3 },
        // { participant_id: 234, member_id: 30, round_id: 18, score: 55, league_id: 3 },
        // { participant_id: 235, member_id: 30, round_id: 19, score: 55, league_id: 3 },
        // { participant_id: 236, member_id: 30, round_id: 20, score: 55, league_id: 3 },
        // { participant_id: 237, member_id: 30, round_id: 21, score: 55, league_id: 3 },
        // { participant_id: 238, member_id: 30, round_id: 22, score: 55, league_id: 3 },
        // { participant_id: 239, member_id: 30, round_id: 23, score: 55, league_id: 3 },
        // { participant_id: 240, member_id: 30, round_id: 24, score: 55, league_id: 3 }

        // { participant_id: 241, member_id: 34, round_id: 25, score: 55 },
        // { participant_id: 242, member_id: 34, round_id: 26, score: 55 },
        // { participant_id: 243, member_id: 34, round_id: 27, score: 55 },
        // { participant_id: 244, member_id: 34, round_id: 28, score: 55 },
        // { participant_id: 245, member_id: 34, round_id: 29, score: 55 },
        // { participant_id: 246, member_id: 34, round_id: 30, score: 55 },
        // { participant_id: 247, member_id: 34, round_id: 31, score: 55 },
        // { participant_id: 248, member_id: 34, round_id: 32, score: 55 },
        // { participant_id: 249, member_id: 34, round_id: 33, score: 55 },
        // { participant_id: 250, member_id: 34, round_id: 34, score: 55 },

        // { participant_id: 251, member_id: 35, round_id: 25, score: 55 },
        // { participant_id: 252, member_id: 35, round_id: 26, score: 55 },
        // { participant_id: 253, member_id: 35, round_id: 27, score: 55 },
        // { participant_id: 254, member_id: 35, round_id: 28, score: 55 },
        // { participant_id: 255, member_id: 35, round_id: 29, score: 55 },
        // { participant_id: 256, member_id: 35, round_id: 30, score: 55 },
        // { participant_id: 257, member_id: 35, round_id: 31, score: 55 },
        // { participant_id: 258, member_id: 35, round_id: 32, score: 55 },
        // { participant_id: 259, member_id: 35, round_id: 33, score: 55 },
        // { participant_id: 260, member_id: 35, round_id: 34, score: 55 },

        // { participant_id: 261, member_id: 36, round_id: 25, score: 55 },
        // { participant_id: 262, member_id: 36, round_id: 26, score: 55 },
        // { participant_id: 263, member_id: 36, round_id: 27, score: 55 },
        // { participant_id: 264, member_id: 36, round_id: 28, score: 55 },
        // { participant_id: 265, member_id: 36, round_id: 29, score: 55 },
        // { participant_id: 266, member_id: 36, round_id: 30, score: 55 },
        // { participant_id: 267, member_id: 36, round_id: 31, score: 55 },
        // { participant_id: 268, member_id: 36, round_id: 32, score: 55 },
        // { participant_id: 269, member_id: 36, round_id: 33, score: 55 },
        // { participant_id: 270, member_id: 36, round_id: 34, score: 55 }

        // { participant_id: 271, member_id: 37, round_id: 25, score: 55 },
        // { participant_id: 272, member_id: 37, round_id: 26, score: 55 },
        // { participant_id: 273, member_id: 37, round_id: 27, score: 55 },
        // { participant_id: 274, member_id: 37, round_id: 28, score: 55 },
        // { participant_id: 275, member_id: 37, round_id: 29, score: 55 },
        // { participant_id: 276, member_id: 37, round_id: 30, score: 55 },
        // { participant_id: 277, member_id: 37, round_id: 31, score: 55 },
        // { participant_id: 278, member_id: 37, round_id: 32, score: 55 },
        // { participant_id: 279, member_id: 37, round_id: 33, score: 55 },
        // { participant_id: 270, member_id: 37, round_id: 34, score: 55 },

        // { participant_id: 281, member_id: 38, round_id: 25, score: 55 },
        // { participant_id: 282, member_id: 38, round_id: 26, score: 55 },
        // { participant_id: 283, member_id: 38, round_id: 27, score: 55 },
        // { participant_id: 284, member_id: 38, round_id: 28, score: 55 },
        // { participant_id: 285, member_id: 38, round_id: 29, score: 55 },
        // { participant_id: 286, member_id: 38, round_id: 30, score: 55 },
        // { participant_id: 287, member_id: 38, round_id: 31, score: 55 },
        // { participant_id: 288, member_id: 38, round_id: 32, score: 55 },
        // { participant_id: 289, member_id: 38, round_id: 33, score: 55 },
        // { participant_id: 290, member_id: 38, round_id: 34, score: 55 },

        // { participant_id: 291, member_id: 39, round_id: 25, score: 55 },
        // { participant_id: 292, member_id: 39, round_id: 26, score: 55 },
        // { participant_id: 293, member_id: 39, round_id: 27, score: 55 },
        // { participant_id: 294, member_id: 39, round_id: 28, score: 55 },
        // { participant_id: 295, member_id: 39, round_id: 29, score: 55 },
        // { participant_id: 296, member_id: 39, round_id: 30, score: 55 },
        // { participant_id: 297, member_id: 39, round_id: 31, score: 55 },
        // { participant_id: 298, member_id: 39, round_id: 32, score: 55 },
        // { participant_id: 299, member_id: 39, round_id: 33, score: 55 },
        // { participant_id: 300, member_id: 39, round_id: 34, score: 55 },

        // { participant_id: 301, member_id: 40, round_id: 25, score: 55 },
        // { participant_id: 302, member_id: 40, round_id: 26, score: 55 },
        // { participant_id: 303, member_id: 40, round_id: 27, score: 55 },
        // { participant_id: 304, member_id: 40, round_id: 28, score: 55 },
        // { participant_id: 305, member_id: 40, round_id: 29, score: 55 },
        // { participant_id: 306, member_id: 40, round_id: 30, score: 55 },
        // { participant_id: 307, member_id: 40, round_id: 31, score: 55 },
        // { participant_id: 308, member_id: 40, round_id: 32, score: 55 },
        // { participant_id: 309, member_id: 40, round_id: 33, score: 55 },
        // { participant_id: 310, member_id: 40, round_id: 34, score: 55 }
      ]);
    });
};
