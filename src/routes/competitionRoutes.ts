import express from "express";
import {
  getCompetition,
  getCompetitionsStandings,
} from "../controllers/competitionController";

const router = express.Router();

router.get("/:leagueCode", async (req, res) => {
  console.log("?");
  const leagueCode = req.params.leagueCode;
  res.json(await getCompetition(leagueCode));
});

router.get("/:leagueCode/standings", async (req, res) => {
  const leagueCode = req.params.leagueCode;
  res.json(await getCompetitionsStandings(leagueCode));
});

export default router;
