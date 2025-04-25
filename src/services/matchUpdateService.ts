// services/matchUpdateService.ts
import { mockMatch } from "../data/mockMatch";
import { GoalEvent } from "../models/match";

const realMadridPlayers = [
  "Antonio Rüdiger",
  "Dani Carvajal",
  "David Alaba",
  "Éder Militão",
  "Ferland Mendy",
  "Fran García",
  "Jesús Vallejo",
  "Lucas Vázquez",
  "Arda Güler",
  "Aurélien Tchouaméni",
  "Dani Ceballos",
  "Eduardo Camavinga",
  "Federico Valverde",
  "Jude Bellingham",
  "Luka Modrić",
  "Brahim Díaz",
  "Endrick",
  "Kylian Mbappé",
  "Rodrygo",
  "Vinícius Jr.",
];

const barcelonaPlayers = [
  "Pau Cubarsí",
  "Alejandro Balde",
  "Ronald Araújo",
  "Andreas Christensen",
  "Gerard Martín",
  "Gavi",
  "Pedri",
  "Frenkie de Jong",
  "Pablo Torre",
  "Dani Olmo",
  "Robert Lewandowski",
  "Ansu Fati",
  "Raphinha",
  "Ferran Torres",
  "Lamine Yamal",
];

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
