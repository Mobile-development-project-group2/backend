import express from "express";
import { Request, Response } from "express";
import {
  getTeamInformation,
  getTeamMatches,
} from "../controllers/teamsController";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const teamId = parseInt(req.params.id);
  const teamInformation = await getTeamInformation(teamId);
  res.json(teamInformation);
});

// http://localhost:3000/api/teams/340/matches?dateFrom=2022-01-01&dateTo=2022-01-10
router.get("/:id/matches", async (req: Request, res: Response) => {
  const teamId = parseInt(req.params.id);
  const { dateFrom, dateTo } = req.query;

  if (!dateFrom || !dateTo) {
    return res
      .status(400)
      .json({ success: false, error: "Missing date range" });
  }
  const teamMatches = await getTeamMatches(
    teamId,
    dateFrom as string,
    dateTo as string
  );
  res.json(teamMatches);
});

export default router;
