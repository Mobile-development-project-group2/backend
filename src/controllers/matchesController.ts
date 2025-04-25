import { API_KEY } from "../config";
import { RawMatchByDate, SimplifiedMatch } from "../../types/api-types";
import axios from "axios";

import dayjs from "dayjs";

const API_TOKEN = API_KEY;

const LEAGUES: { [key: string]: string } = {
  PD: "La Liga",
  PL: "Premier League",
  FL1: "Ligue 1",
  BL1: "Bundesliga",
  SA: "Serie A",
};

// TODO: Update this to use use Result<SimplifiedMatch[]> wrapper

const getMatchesForLeague = async (
  leagueCode: string,
  date: string
): Promise<SimplifiedMatch[]> => {
  const url = `https://api.football-data.org/v4/competitions/${leagueCode}/matches?dateFrom=${date}&dateTo=${date}`;

  const response = await axios.get(url, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });

  const matches: RawMatchByDate[] = response.data.matches;

  return matches.map((match) => ({
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    date: dayjs(match.utcDate).format("YYYY-MM-DD"),
    time: dayjs(match.utcDate).format("HH:mm"),
  }));
};

// TODO:later update types with Result<Match[]>
export const getMatchesByDate = async (
  date: string
): Promise<{
  [key: string]: SimplifiedMatch[];
}> => {
  try {
    // Fetch matches from all leagues in parallel
    const allMatchesArrays = await Promise.all(
      Object.keys(LEAGUES).map((code) => getMatchesForLeague(code, date))
    );

    // Create an object to hold matches by league name
    const matchesByLeague: { [key: string]: SimplifiedMatch[] } = {};

    // Map the results into league-specific keys
    Object.keys(LEAGUES).forEach((code, index) => {
      const leagueName = LEAGUES[code];
      matchesByLeague[leagueName] = allMatchesArrays[index];
    });

    return matchesByLeague;
  } catch (error: any) {
    console.error(
      "Error fetching matches:",
      error.response?.data || error.message
    );
    return { success: false, error: "Failed fetching league data" };
  }
};
