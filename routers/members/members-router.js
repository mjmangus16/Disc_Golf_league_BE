const router = require("express").Router();
const db = require("./members-model");
const dbLeagues = require("../leagues/leagues-model");
const restrictedAdmin = require("../../middleware/restrictedAdmin");

// TYPE:  GET
// ROUTE:   /api/members/test
// DESCRIPTION: Tests the members router

router.get("/test", (req, res) => {
  res.send("The members router is working!");
});

// TYPE:  GET
// ROUTE:   /api/members/
// DESCRIPTION: Gets all members data

router.get("/", (req, res) => {
  db.getMembers()
    .then(members => {
      if (members.length > 0) {
        res.status(200).json(members);
      } else {
        res.status(500).json({ error: "There are no members available" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error getting members" });
    });
});

// TYPE:  GET
// ROUTE:   /api/members/test
// DESCRIPTION: Gets members for a specific league

router.get("/league/:league_id", (req, res) => {
  db.getMembersByLeagueId(req.params.league_id)
    .then(members => {
      if (members.length > 0) {
        res.status(200).json(members);
      } else {
        res
          .status(500)
          .json({ error: "There are no members available for this league." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Server error getting members for that league." });
    });
});

// TYPE:  POST
// ROUTE:   /api/members/add
// DESCRIPTION: Adds a member to a league

router.post("/add", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.body.league_id);

  if (league) {
    if (league.owner_id === req.jwt.user_id) {
      db.addMemberToLeague(req.body).then(member => {
        res.status(200).json({
          success: `${member.f_name} was successfully added to ${league.name}.`
        });
      });
    } else {
      res.status(500).json({
        error: "Only the manager of this league can add a member."
      });
    }
  } else {
    res.status(500).json({
      error: "We can not add a member to a league that does not exist."
    });
  }
});

module.exports = router;
