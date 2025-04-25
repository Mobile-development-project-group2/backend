import { API_KEY } from "../config";
import { Standings, Result, League } from "../../types/api-types";
import axios from "axios";

export const getCompetitionsStandings = async (
  leagueCode: string
): Promise<Result<Standings>> => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    return { success: true, data: response.data };
  } catch {
    return { success: false, error: "Failed fetching league standings" };
  }
};

export const getCompetition = async (
  leagueCode: string
): Promise<Result<League>> => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message || error);
    return { success: false, error: "Failed fetching league data" };
  }
};
