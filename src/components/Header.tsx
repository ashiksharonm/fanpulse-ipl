import { Timer, UserCircle } from 'lucide-react';

export default function Header({ points }: { points: number }) {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(255,179,175,0.15)]">
      <div className="flex items-center gap-md">
        <span className="font-display text-2xl font-black tracking-tighter text-primary uppercase italic">Pulse IPL</span>
        <div className="hidden md:flex gap-4 ml-8">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Grand Final: RCB vs CSK</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Your Score</span>
          <span className="font-display text-lg font-bold text-secondary-container">{points.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-primary hover:bg-white/5 rounded-full transition-all active:scale-95">
            <Timer size={20} />
          </button>
          <button className="p-2 text-primary hover:bg-white/5 rounded-full transition-all active:scale-95">
            <UserCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
