const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const usersRouter = require("./routers/users/users-router");
const leaguesRouter = require("./routers/leagues/leagues-router");
const membersRouter = require("./routers/members/members-router");
const roundsRouter = require("./routers/rounds/rounds-router");
const participantsRouter = require("./routers/participants/participants-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/leagues", leaguesRouter);
server.use("/api/members", membersRouter);
server.use("/api/rounds", roundsRouter);
server.use("/api/participants", participantsRouter);

server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

module.exports = server;
