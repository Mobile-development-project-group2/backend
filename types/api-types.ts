export type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type Area = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

export type Competition = {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
};

export type Coach = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: {
    start: string;
    until: string;
  };
};

export type Player = {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
};

export type Club = {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: Competition[];
  coach: Coach;
  squad: Player[];
  staff: any[]; // No staff data provided, so keeping it generic
  lastUpdated: string;
};

export type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number | null;
  winner: Team | null;
};

export type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

export type League = {
  area: Area;
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  currentSeason: Season;
  seasons: Season[];
};

export type TeamStanding = {
  position: number;
  team: Team; // You can reuse the Team type you already defined
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type StandingsTable = {
  stage: string;
  type: string;
  group: string | null;
  table: TeamStanding[];
};

export type Standings = {
  filters: {
    season: string;
  };
  area: Area;
  competition: Competition;
  season: Season;
  standings: StandingsTable[];
};

export type RawMatchByDate = {
  utcDate: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
};

export type SimplifiedMatch = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
};
