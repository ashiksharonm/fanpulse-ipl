import { useState } from 'react';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import BottomNav from './components/BottomNav.tsx';
import Scoreboard from './components/Scoreboard.tsx';
import PitchHeatmap from './components/PitchHeatmap.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import PredictionZone from './components/PredictionZone.tsx';
import { useMatchSimulation } from './hooks/useMatchSimulation.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState('live');
  const { 
    match, 
    timeLeft, 
    isLocked, 
    lastBall, 
    userPoints, 
    feedback, 
    isFlashActive,
    resolveDelivery 
  } = useMatchSimulation();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="w-full flex flex-col gap-6">
            <Scoreboard match={match} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Leaderboard points={userPoints} />
               <div className="glass-card p-lg flex flex-col items-center justify-center text-center">
                  <h3 className="font-display text-xl font-bold mb-2">Upcoming Challenges</h3>
                  <p className="text-on-surface-variant text-sm tracking-wide">Stay tuned for the next over!</p>
               </div>
            </div>
          </div>
        );
      case 'ranks':
        return (
          <div className="w-full max-w-4xl mx-auto">
            <Leaderboard points={userPoints} />
          </div>
        );
      case 'predict':
        return (
          <div className="w-full max-w-xl mx-auto">
            <PredictionZone 
              timeLeft={timeLeft} 
              isLocked={isLocked} 
              onPredict={resolveDelivery} 
              feedback={feedback}
              isFlashActive={isFlashActive}
            />
          </div>
        );
      case 'live':
      default:
        return (
          <>
            {/* LEFT COLUMN (60%) */}
            <div className="w-full lg:w-[62%] flex flex-col gap-6">
              <Scoreboard match={match} />
              <PitchHeatmap lastBall={lastBall} />
              <Leaderboard points={userPoints} />
            </div>

            {/* RIGHT COLUMN (40%) */}
            <div className="w-full lg:w-[38%] flex min-h-[600px] lg:min-h-0">
              <PredictionZone 
                timeLeft={timeLeft} 
                isLocked={isLocked} 
                onPredict={resolveDelivery} 
                feedback={feedback}
                isFlashActive={isFlashActive}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 pb-20 lg:pb-0">
      <Header points={userPoints} />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-24 pb-lg px-margin-mobile lg:pl-[288px] lg:pr-margin-desktop min-h-screen flex flex-col lg:flex-row gap-lg">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
