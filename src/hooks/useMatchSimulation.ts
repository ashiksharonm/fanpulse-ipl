import { useState, useEffect, useCallback, useRef } from 'react';
import { MatchState, BallData } from '../types';

const INITIAL_MATCH_STATE: MatchState = {
  battingTeam: 'RCB',
  bowlingTeam: 'CSK',
  score: 168,
  wickets: 4,
  overs: 17,
  balls: 2,
  crr: 9.8,
  target: 195,
  status: 'live',
};

const BASE_POINTS = 500;
const DECAY_RATE = 0.15; // Points decay over time

export function useMatchSimulation() {
  const [match, setMatch] = useState<MatchState>(INITIAL_MATCH_STATE);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isLocked, setIsLocked] = useState(false);
  const [lastBall, setLastBall] = useState<BallData | null>(null);
  const [userPoints, setUserPoints] = useState(4850);
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | 'neutral' } | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  
  const startTimeRef = useRef<number>(Date.now());

  // Firebase-like Service Simulation
  useEffect(() => {
    // This represents a listener to /match_state
    // When 'run_up' is triggered (here, just at the start of a new ball)
    if (!isLocked && timeLeft === 10) {
      startTimeRef.current = Date.now();
    }
  }, [isLocked, timeLeft]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isLocked) {
      // 'ball_bowled' triggered
      handleBallBowled();
    }
  }, [timeLeft, isLocked]);

  const handleBallBowled = useCallback(() => {
    setIsLocked(true);
    
    // Platform specific triggers (Agent 2)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Trigger heavy haptic vibration
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 30, 100, 30, 200]);
      }
    } else {
      // Trigger brief, intense visual flash on web
      setIsFlashActive(true);
      setTimeout(() => setIsFlashActive(false), 200);
    }

    resolveDelivery();
  }, []);

  const resolveDelivery = useCallback((prediction?: string) => {
    // If prediction comes in, calculate score using time-decay
    let scoreEarned = 0;
    if (prediction && prediction !== 'skip') {
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
      // Formula: Base * e^(-k * t)
      scoreEarned = Math.round(BASE_POINTS * Math.exp(-DECAY_RATE * timeElapsed));
    }

    setIsLocked(true);
    
    // Simulate ball result
    const results: BallData['result'][] = ['dot', '1', '2', '4', '6', 'W'];
    const randomResult = results[Math.floor(Math.random() * results.length)];
    
    const ball: BallData = {
      pitchX: 20 + Math.random() * 60,
      pitchY: 20 + Math.random() * 60,
      type: Math.random() > 0.5 ? 'pace' : 'spin',
      result: randomResult,
    };

    setLastBall(ball);

    // Update Match Score
    setMatch((prev) => {
      let newScore = prev.score;
      let newWickets = prev.wickets;
      let newBalls = prev.balls + 1;
      let newOvers = prev.overs;

      if (randomResult === 'W') {
        newWickets += 1;
      } else if (randomResult !== 'dot') {
        newScore += parseInt(randomResult) || 0;
      }

      if (newBalls === 6) {
        newOvers += 1;
        newBalls = 0;
      }

      return {
        ...prev,
        score: newScore,
        wickets: newWickets,
        overs: newOvers,
        balls: newBalls,
        crr: parseFloat((newScore / (newOvers + newBalls / 6)).toFixed(1)),
      };
    });

    // Check Prediction
    if (prediction && prediction !== 'skip') {
      const isCorrect = Math.random() > 0.4; // Slightly better odds for demo
      if (isCorrect) {
        setUserPoints((p) => p + scoreEarned);
        setFeedback({ msg: `Correct! +${scoreEarned} pts`, type: 'success' });
      } else {
        setFeedback({ msg: 'Nice try! Next one?', type: 'error' });
      }
    } else {
      setFeedback({ msg: prediction === 'skip' ? 'Delivery Skipped' : 'Delivery complete (No prediction)', type: 'neutral' });
    }

    // Reset for next ball after delay
    setTimeout(() => {
      setIsLocked(false);
      setTimeLeft(10);
      setFeedback(null);
    }, 3000);
  }, []);

  return {
    match,
    timeLeft,
    isLocked,
    lastBall,
    userPoints,
    feedback,
    isFlashActive,
    resolveDelivery,
  };
}
