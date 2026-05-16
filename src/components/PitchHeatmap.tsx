import { useState } from 'react';
import { BallData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function PitchHeatmap({ lastBall }: { lastBall: BallData | null }) {
  const [mode, setMode] = useState<'pace' | 'spin'>('pace');

  return (
    <div className="glass-card p-md flex-grow flex flex-col min-h-[350px]">
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
        <div className="flex flex-col">
          <h3 className="font-display text-xl font-bold text-on-surface">Pitch Heatmap</h3>
          {lastBall && (
            <span className="text-[10px] font-bold text-secondary-container uppercase tracking-wider">
              Last Ball: {lastBall.type} • Result: {lastBall.result === 'dot' ? 'DOT' : lastBall.result === 'W' ? 'WICKET' : `${lastBall.result} RUNS`}
            </span>
          )}
        </div>
        <div className="flex gap-2 bg-surface-container-high/40 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setMode('pace')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              mode === 'pace' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Pace
          </button>
          <button
            onClick={() => setMode('spin')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              mode === 'spin' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Spin
          </button>
        </div>
      </div>

      <div className="relative w-full flex-grow bg-[#0c0c0c] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBb3bhvYrDwpDtqoTZb65i3B5mzbAZRXDSRnHLnMmjumdIJJ_G1os1qpTYaFwfpoi-51YjbFrywkC9QlJwAbH2Je9-o9irk1Yb_TpKN6Y0sA62uyLf6UxgpXM8pcR0osESFlMWCcduFwysUlEpaxKApQup789Pjx5O0JRiFdroGV0XOGjtMJPlbcpQVZMKisFK8omTnGMJvkfjLQpgZhd0gQFkGMdCsmL8wt60Syq47UqQ8t72sy-qvJ85nCD7iUxZV1EUrM4l5v717')` }}
        />

        <div className="relative w-[140px] h-[85%] border-2 border-white/10 bg-white/[0.03] flex flex-col justify-between p-3 ring-1 ring-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="w-full flex justify-center gap-1.5 z-10">
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
          </div>

          <AnimatePresence mode="popLayout">
            {lastBall && lastBall.type === mode && (
              <motion.div 
                key={Date.now()}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute w-12 h-12 flex items-center justify-center"
                style={{ left: `${lastBall.pitchX}%`, top: `${lastBall.pitchY}%` }}
              >
                <div className={`w-10 h-10 rounded-full blur-xl animate-pulse ${mode === 'pace' ? 'bg-primary/40' : 'bg-tertiary-container/40'}`} />
                <div className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_20px_white] ${mode === 'pace' ? 'bg-primary' : 'bg-tertiary'}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fallback Static Points if no active lastBall */}
          {!lastBall && (
             <>
               <div className="absolute top-[20%] left-[25%] w-14 h-14 rounded-full bg-primary/20 blur-xl animate-pulse" />
               <div className="absolute top-[25%] left-[40%] w-8 h-8 rounded-full bg-primary shadow-[0_0_24px_rgba(255,179,175,0.8)] z-10 border-2 border-white/40" />
               
               <div className="absolute top-[60%] left-[55%] w-16 h-16 rounded-full bg-tertiary-container/20 blur-xl animate-pulse" />
               <div className="absolute top-[65%] left-[65%] w-6 h-6 rounded-full bg-tertiary shadow-[0_0_20px_rgba(0,219,233,0.6)] z-10 border-2 border-white/40" />
             </>
          )}

          <div className="w-full flex justify-center gap-1.5 z-10">
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
            <div className="w-1.5 h-4 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
