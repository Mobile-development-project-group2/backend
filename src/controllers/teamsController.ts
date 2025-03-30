import axios from "axios";
import { Club, Result } from "../../types/api-types";

const API_KEY = process.env.API_KEY;

export const getTeamInformation = async (
  teamId: number
): Promise<Result<Club>> => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/teams/${teamId}`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );
    return { success: true, data: response.data };
  } catch {
    return { success: false, error: "Failed to fetch club information" };
  }
};

export const getTeamMatches = async (
  teamId: number,
  dateFrom: string,
  dateTo: string
) => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/teams/${teamId}/matches`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );
    return response.data;
  } catch {
    return { success: false, error: "Failed to fetch matches" };
  }
};
