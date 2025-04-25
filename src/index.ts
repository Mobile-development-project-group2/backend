import dotenv from "dotenv";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";
import { mockMatch } from "./data/mockMatch";
import express from "express";
import competitionsRoutes from "./routes/competitionRoutes";
import teamsRoutes from "./routes/teamsRoutes";
import matchesRouter from "./routes/matchesRouter";
import { updateMatch } from "./services/matchUpdateService";
import * as admin from "firebase-admin";
import { FIREBASE_TOKEN } from "./config";

const serviceAccount = JSON.parse(
  fs.readFileSync("firebaseServiceAccountKey.json", "utf8")
);
const deviceToken = FIREBASE_TOKEN;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
    const payload: any = {
      notification: {
        title: "⚽ Goal!",
        body: `${
          updatedMatch.lastEvent.team === "HOME"
            ? updatedMatch.homeTeam
            : updatedMatch.awayTeam
        } scored!`,
      },
      android: {
        notification: {
          clickAction: "MAIN_ACTIVITY",
          sound: "default",
          channelId: "goal_channel",
        },
      },
      data: {
        scorer: updatedMatch.lastEvent.scorer,
        minute: updatedMatch.lastEvent.minute.toString(),
      },
      token: deviceToken,
    };

    // 🔥 Push notification to this token
    admin
      .messaging()
      .send(payload)
      .then((response) => {
        console.log("Notification sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });

    // Also emit via Socket.IO
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
}, 30000); // 1 minute

app.use("/api/competitions", competitionsRoutes);
app.use("/api/teams", teamsRoutes);
app.get("/api/match", (req, res) => {
  console.log("Match data requested");
  res.json(matchData);
});
app.use("/api/matches", matchesRouter);

server.listen(3000, () => {
  console.log("Server is running with Socket.IO on port 3000");
});
