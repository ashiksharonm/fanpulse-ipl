import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PredictionZoneProps {
  timeLeft: number;
  isLocked: boolean;
  onPredict: (type: string) => void;
  feedback: { msg: string; type: 'success' | 'error' | 'neutral' } | null;
  isFlashActive?: boolean;
}

export default function PredictionZone({ timeLeft, isLocked, onPredict, feedback, isFlashActive }: PredictionZoneProps) {
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  const controls = [
    { id: 'bouncer', icon: ArrowUp, label: 'Bouncer', gridClass: 'col-start-2', key: 'w' },
    { id: 'spin_away', icon: ArrowLeft, label: 'Spin Away', gridClass: 'col-start-1 row-start-2', key: 'a' },
    { id: 'spin_in', icon: ArrowRight, label: 'Spin In', gridClass: 'col-start-3 row-start-2', key: 'd' },
    { id: 'yorker', icon: ArrowDown, label: 'Yorker', gridClass: 'col-start-2 row-start-3', key: 's' },
  ];

  // Agent 1: Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;
      const key = e.key.toLowerCase();
      const control = controls.find(c => c.key === key || `arrow${c.id}` === key || (key === 'arrowup' && c.id === 'bouncer') || (key === 'arrowdown' && c.id === 'yorker') || (key === 'arrowleft' && c.id === 'spin_away') || (key === 'arrowright' && c.id === 'spin_in'));
      if (control) onPredict(control.id);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, onPredict]);

  // Agent 1: Swipe Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isLocked) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) {
        onPredict(dx > 0 ? 'spin_in' : 'spin_away');
      }
    } else {
      if (Math.abs(dy) > 30) {
        onPredict(dy > 0 ? 'yorker' : 'bouncer');
      }
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`w-full h-full min-h-[500px] bg-white/[0.06] backdrop-blur-[40px] border border-white/20 border-t-white/40 border-l-white/40 rounded-[32px] p-lg flex flex-col items-center justify-center relative shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-100 ${isFlashActive ? 'bg-white/40' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {feedback ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`z-30 absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md ${
              feedback.type === 'success' ? 'bg-green-500/10' : feedback.type === 'error' ? 'bg-red-500/10' : 'bg-white/5'
            }`}
          >
            <span className={`text-3xl font-black font-display uppercase italic tracking-tighter mb-4 ${
               feedback.type === 'success' ? 'text-green-400' : feedback.type === 'error' ? 'text-red-400' : 'text-white'
            }`}>
              {feedback.msg}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="text-center z-10 mb-xl w-full">
        <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Live Prediction
        </span>
        <h2 className="font-display text-4xl font-extrabold text-on-surface leading-none tracking-tighter mb-2">
          {isLocked ? 'Delivery In Progress...' : 'Next Delivery?'}
        </h2>
        <p className="text-sm font-medium text-on-surface-variant">Lock in your call before the bowler releases.</p>
      </div>

      <div className="z-10 relative flex items-center justify-center mb-xl">
        <div className="w-48 h-48 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
          <motion.div 
            animate={{ 
              scale: isLocked ? [1, 1.1, 1] : 1,
              borderColor: isLocked ? '#ffb3af' : 'transparent'
            }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 rounded-full border-4 opacity-50 shadow-[0_0_32px_rgba(255,179,175,0.4)]"
          />
          <span className={`font-display text-7xl font-black transition-colors tracking-tighter italic ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
            {isLocked ? '??' : `${timeLeft.toString().padStart(2, '0')}s`}
          </span>
        </div>
      </div>

      <div className={`grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-[300px] z-10 transition-opacity duration-300 ${isLocked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <div className="col-start-2 row-start-2 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-on-surface-variant opacity-20 tracking-widest uppercase">WASD</span>
        </div>
        
        {controls.map((control) => (
          <div key={control.id} className={control.gridClass}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPredict(control.id)}
              className="w-full aspect-square flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface-container-high/50 border border-white/10 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <control.icon size={28} className="text-on-surface group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider group-hover:text-on-surface transition-colors">{control.label}</span>
            </motion.button>
          </div>
        ))}
      </div>

      {!isLocked && (
        <div className="mt-xl w-full max-w-[300px] z-10">
          <button 
            onClick={() => onPredict('skip')}
            className="w-full py-4 bg-white/5 border border-white/10 text-on-surface font-semibold text-sm rounded-xl hover:bg-white/10 transition-all active:scale-[0.99]"
          >
            Skip Delivery
          </button>
        </div>
      )}
    </div>
  );
}
