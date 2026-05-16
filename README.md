# Pulse Elite — Live Match Companion

A high-performance React application for live sports fan engagement, featuring real-time match state synchronization, predictive gameplay, and global leaderboards.

## 🚀 Live Demo
**URL:** [https://pulse-elite-4jyzhezt3a-uc.a.run.app](https://pulse-elite-4jyzhezt3a-uc.a.run.app)

---

## 🛠 Features

### 1. Prediction Zone (Agent 1)
- **Dual-Input Routing:** Supports both Desktop (Keyboard: WASD / Arrow Keys) and Mobile (Touch: Swipe gestures).
- **Responsive Design:** Optimized for stacked mobile views and side-by-side desktop layouts.
- **Visual Feedback:** Particle animations and micro-interactions for every prediction.

### 2. State Management (Agent 2)
- **Real-time Sync:** Mocked Firebase service for `run_up` and `ball_bowled` events.
- **Haptic Feedback:** Triggered `navigator.vibrate` on mobile devices for ball release.
- **Visual Flash:** Intense UI flash on the timer for desktop browsers.

### 3. Scoring & Analytics (Agent 3)
- **Time-Decay Scoring:** XP rewards decrease exponentially as the delivery clock ticks down.
- **Pitch Heatmap:** Real-time visualization of delivery types and pitch locations.
- **Leaderboard:** Real-time Global Top 10 rankings.

---

## 💻 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Setup & Run
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pulse-elite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev -- --port 8081
   ```
   Navigate to `http://localhost:8081` in your browser.

---

## 🚢 Deployment (Google Cloud Run)

To deploy this project to Google Cloud Run using the included `cloudbuild.yaml`:

```bash
gcloud builds submit --config cloudbuild.yaml
```

---

*Created by Antigravity.*
