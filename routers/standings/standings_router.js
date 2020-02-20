const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("The standings router is working!");
});

module.exports = router;
