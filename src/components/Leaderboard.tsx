import { Users, User } from 'lucide-react';

export default function Leaderboard({ points }: { points: number }) {
  const users = [
    { rank: 1, name: 'You (Analyst_99)', score: points, current: true },
    { rank: 2, name: 'CricketGod', score: 4720 },
    { rank: 3, name: 'SpinKing22', score: 4695 },
    { rank: 4, name: 'PaceTracker', score: 4510 },
    { rank: 5, name: 'WicketKeeper', score: 4480 },
    { rank: 6, name: 'RunMachine', score: 4320 },
    { rank: 7, name: 'BoundaryBlaster', score: 4210 },
    { rank: 8, name: 'LeggieWizard', score: 4150 },
    { rank: 9, name: 'GooglyMaster', score: 4020 },
    { rank: 10, name: 'SlogSweeper', score: 3950 },
  ];

  return (
    <div className="glass-card p-md flex flex-col max-h-[280px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-xl font-bold text-on-surface">Live Ranks</h3>
        <span className="text-xs font-bold text-primary flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
          <Users size={14} /> 12,402
        </span>
      </div>

      <div className="overflow-y-auto pr-2 flex flex-col gap-2">
        {users.sort((a, b) => b.score - a.score).map((user, idx) => (
          <div
            key={user.name}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
              user.current
                ? 'bg-secondary-container/10 border-secondary-container/30 shadow-[0_0_15px_rgba(255,219,60,0.1)]'
                : 'hover:bg-white/5 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-display text-xl font-bold w-6 text-center ${user.current ? 'text-secondary-container' : 'text-on-surface-variant opacity-60'}`}>
                {idx + 1}
              </span>
              <div className={`w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border ${user.current ? 'border-secondary-container' : 'border-white/10'}`}>
                <User size={18} className={user.current ? 'text-secondary-container' : 'text-on-surface-variant'} />
              </div>
              <span className={`text-sm font-semibold ${user.current ? 'text-on-surface' : 'text-on-surface-variant'}`}>{user.name}</span>
            </div>
            <span className={`font-display text-xl font-bold ${user.current ? 'text-secondary-container drop-shadow-[0_0_8px_rgba(255,219,60,0.4)]' : 'text-on-surface'}`}>
              {user.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
