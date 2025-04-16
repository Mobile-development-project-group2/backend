import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { mockMatch } from "./data/mockMatch";
import express from "express";
import competitionsRoutes from "./routes/competitionRoutes";
import teamsRoutes from "./routes/teamsRoutes";
import { updateMatch } from "./services/matchUpdateService";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to the Football API");
});

let matchData = {
  homeTeam: "Real Madrid",
  awayTeam: "Barcelona",
  homeScore: 0,
  awayScore: 0,
  time: "0'",
};

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("matchUpdate", mockMatch);

  socket.emit("matchUpdate", matchData);
});

setInterval(() => {
  const updatedMatch = updateMatch();

  // Only emit if there was a goal
  if (updatedMatch.lastEvent) {
    io.emit("goalScored", {
      match: updatedMatch,
      goalEvent: updatedMatch.lastEvent,
    });
    console.log(
      `GOAL! ${
        updatedMatch.lastEvent.team === "HOME"
          ? updatedMatch.homeTeam
          : updatedMatch.awayTeam
      } scored! ${updatedMatch.homeTeam} ${updatedMatch.homeScore} - ${
        updatedMatch.awayScore
      } ${updatedMatch.awayTeam}`
    );
  }

  io.emit("matchUpdate", updatedMatch);
}, 6000); // 1 minute

app.use("/api/competitions", competitionsRoutes);
app.use("/api/teams", teamsRoutes);

server.listen(3000, () => {
  console.log("Server is running with Socket.IO on port 3000");
});
