import dotenv from "dotenv";

import express from "express";
import competitionsRoutes from "./routes/competitionRoutes";
import teamsRoutes from "./routes/teamsRoutes";

dotenv.config();
console.log("API_KEY", process.env.API_KEY);

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Football API");
});

app.use("/api/competitions", competitionsRoutes);
app.use("/api/teams", teamsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
