import express from "express";

import { getMatchesByDate } from "../controllers/matchesController";

const router = express.Router();

router.get("/", async (req, res) => {
  const date = req.query.date as string;
  res.json(await getMatchesByDate(date));
});
export default router;
