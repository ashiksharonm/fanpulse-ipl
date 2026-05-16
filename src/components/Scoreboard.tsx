import { MatchState } from '../types';

export default function Scoreboard({ match }: { match: MatchState }) {
  return (
    <div className="glass-card p-md flex items-center justify-between relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary-container to-primary opacity-50"></div>
      
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-[0.2em] mb-1">
          {match.battingTeam} vs {match.bowlingTeam} • T20 Final
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-secondary-container">{match.battingTeam}</span>
          <span className="font-display text-6xl font-black text-on-surface drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            {match.score}/{match.wickets}
          </span>
        </div>
        <span className="text-sm text-on-surface-variant font-medium mt-1">
          Overs: {match.overs}.{match.balls} • CRR: {match.crr}
        </span>
      </div>

      <div className="flex flex-col items-end text-right">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(255,83,87,0.8)] pulse-animation"></span>
          <span className="text-xs font-bold text-primary-container tracking-widest uppercase">Live</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-2 opacity-70">
            <span className="font-display text-xl font-bold text-on-surface">{match.bowlingTeam}</span>
            {match.target && (
              <span className="text-xs font-bold text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded">
                Target: {match.target}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-on-surface-variant mt-1">
            Need {(match.target || 0) - match.score} off {(20 - match.overs) * 6 - match.balls} balls
          </span>
        </div>
      </div>
    </div>
  );
}
