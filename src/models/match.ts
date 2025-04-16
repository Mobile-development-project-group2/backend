export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  lastEvent?: GoalEvent;
}

export interface GoalEvent {
  minute: number;
  team: "HOME" | "AWAY";
  scorer: string;
}
