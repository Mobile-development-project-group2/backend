import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const API_KEY = process.env.API_KEY;
app.get("/", (req, res) => {
    res.send("Welcome to the Football API!");
});
app.get("/league", async (req, res) => {
    //const data = await fetchLeagueStandings("PL");
    const data = await getTeamInformation(340);
    console.log("Data:", data);
    res.send("Hello World!");
});
const fetchLeagueStandings = async (leagueCode) => {
    try {
        const response = await axios.get(`https://api.football-data.org/v4/competitions/${leagueCode}/standings`, {
            headers: {
                "X-Auth-Token": API_KEY,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};
const getTeamInformation = async (teamId) => {
    try {
        const response = await axios.get(`https://api.football-data.org/v4/teams/${teamId}`, {
            headers: {
                "X-Auth-Token": API_KEY,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
