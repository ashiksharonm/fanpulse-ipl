export interface MatchState {
  battingTeam: string;
  bowlingTeam: string;
  score: number;
  wickets: number;
  overs: number;
  balls: number;
  crr: number;
  target?: number;
  status: 'live' | 'completed';
}

export interface Prediction {
  id: string;
  type: string;
  points: number;
  label: string;
}

export interface UserState {
  rank: number;
  name: string;
  points: number;
}

export interface BallData {
  pitchX: number;
  pitchY: number;
  type: 'pace' | 'spin';
  result: 'dot' | '1' | '2' | '3' | '4' | '6' | 'W';
}
