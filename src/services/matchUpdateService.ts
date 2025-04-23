// services/matchUpdateService.ts
import { mockMatch } from "../data/mockMatch";
import { GoalEvent } from "../models/match";

const realMadridPlayers = [
  "Bellingham",
  "Vinícius Jr.",
  "Rodrygo",
  "Mbappé",
  "Modric",
];

const barcelonaPlayers = ["Lewandowski", "Pedri", "Gavi", "Yamal", "Raphinha"];

export function updateMatch() {
  mockMatch.minute += 1;

  if (Math.random() <= 0.99) {
    const scoringTeam = Math.random() < 0.5 ? "HOME" : "AWAY";

    // Get appropriate player list and select a random scorer
    const players =
      scoringTeam === "HOME" ? realMadridPlayers : barcelonaPlayers;
    const scorer = players[Math.floor(Math.random() * players.length)];

    const goalEvent: GoalEvent = {
      minute: mockMatch.minute,
      team: scoringTeam,
      scorer: scorer,
    };

    if (scoringTeam === "HOME") {
      mockMatch.homeScore += 1;
    } else {
      mockMatch.awayScore += 1;
    }

    // Save last event
    mockMatch.lastEvent = goalEvent;
  } else {
    mockMatch.lastEvent = undefined;
  }

  return mockMatch;
}
