const router = require("express").Router();
const dbMembers = require("./members-model");
const dbLeagues = require("../leagues/leagues-model");
const dbUsers = require("../users/users-model");
const restrictedAdmin = require("../../middleware/restrictedAdmin");
const checkLeagueOwner = require("../../middleware/checkLeagueOwner");

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
  dbMembers
    .getMembers()
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
// ROUTE:   /api/members/league/:league_id
// DESCRIPTION: Gets members for a specific league

router.get("/league/:league_id", (req, res) => {
  dbMembers
    .getMembersByLeagueId(req.params.league_id)
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
// ROUTE:   /api/members/add/league/:league_id
// DESCRIPTION: Adds a member to a league

router.post("/add/league/:league_id", restrictedAdmin, async (req, res) => {
  const league = await dbLeagues.getLeagueById(req.params.league_id);

  let newMember = {
    f_name: req.body.f_name,
    l_name: req.body.l_name
  };

  if (req.body.email !== "") {
    const user = await dbUsers.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(500).json({
        error: "That email address is not connected to a registered user."
      });
    } else {
      newMember.user_id = user.user_id;
    }
  }

  if (league) {
    if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
      dbMembers
        .addMemberToLeague(newMember, req.params.league_id)
        .then(member => {
          res.status(200).json(member);
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

// TYPE:  PUT
// ROUTE:   /api/members/update/:member_id/league/:league_id
// DESCRIPTION: Connects a member with their user account via email

router.put(
  "/update/:member_id/league/:league_id",
  restrictedAdmin,
  async (req, res) => {
    const user = await dbUsers.getUserByEmail(req.body.email);
    const league = await dbLeagues.getLeagueById(req.params.league_id);
    const member = await dbMembers.getMemberById(req.params.member_id);

    if (league) {
      if (league.league_id === member.league_id) {
        if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
          if (user) {
            if (member) {
              dbMembers
                .updateMember(req.params.member_id, { user_id: user.user_id })
                .then(() => {
                  res.status(200).json({
                    success: `${member.f_name} ${member.l_name} was successfully updated.`
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error:
                      "There was an error trying to update that member, please try again later."
                  });
                });
            } else {
              res.status(500).json({
                error:
                  "You must be the league owner to make updates to any members of the league."
              });
            }
          } else {
            res
              .status(500)
              .json({ error: "That member does not exist in our database." });
          }
        } else {
          res
            .status(500)
            .json({ error: "That email does not exist in our database." });
        }
      } else {
        res
          .status(500)
          .json({ error: "That member is not part of this league." });
      }
    } else {
      res
        .status(500)
        .json({ error: "That league does not exist in our database." });
    }
  }
);

// TYPE:  DELETE
// ROUTE:   /api/members/delete/:member_id/league/:league_id
// DESCRIPTION: Deletes the member and all participants connected to that member

router.delete(
  "/delete/:member_id/league/:league_id",
  restrictedAdmin,
  async (req, res) => {
    const member = await dbMembers.getMemberById(req.params.member_id);
    const league = await dbLeagues.getLeagueById(req.params.league_id);

    if (league) {
      if (league.league_id === member.league_id) {
        if (checkLeagueOwner(league.owner_id, req.jwt.user_id)) {
          if (member) {
            dbMembers
              .deleteMember(req.params.member_id)
              .then(() => {
                res.status(200).json({
                  success: `${member.f_name} ${member.l_name} was successfully deleted from this league.`
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error:
                    "There was an error trying to delete that member, please try again later."
                });
              });
          } else {
            res
              .status(500)
              .json({ error: "That member does not exist in our database." });
          }
        } else {
          res
            .status(500)
            .json({ error: "That email does not exist in our database." });
        }
      } else {
        res
          .status(500)
          .json({ error: "That member is not part of this league." });
      }
    } else {
      res
        .status(500)
        .json({ error: "That league does not exist in our database." });
    }
  }
);

module.exports = router;
