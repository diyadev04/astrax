# ASTRAX - Digital Superhero Experience

Welcome to ASTRAX, a highly cinematic, full-stack web application that delivers a "Cyberpunk cinematic game interface + futuristic superhero command center + premium interactive web experience."

## Features

- **Cinematic Intro**: Boot-up sequence with glitch effects and system initialization.
- **3D Environment**: Interactive React Three Fiber background with glowing particles and an abstract superhero core.
- **ASTRAX HUD**: Persistent, futuristic heads-up display tracking system status and threat levels.
- **Conversational Chatbot**: Immersive grievance submission flow disguised as a conversation with ASTRAX.
- **Origin Story**: Scroll-driven storytelling using Framer Motion.
- **Power System**: Interactive holographic modules explaining ASTRAX's capabilities.
- **ASTRAX: SIGNAL RUN**: Fully playable HTML5 Canvas top-down endless runner game.
- **Backend API**: Node.js/Express backend handling database storage (SQLite) and email notifications (Nodemailer).

## Tech Stack

**Frontend**: React, Vite, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Zustand.
**Backend**: Node.js, Express, TypeScript, SQLite, Nodemailer.

## Installation

1. Clone the repository.
2. Setup Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

In `backend/.env`, you must configure your SMTP credentials for email functionality:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
ADMIN_EMAIL=admin@astrax.local
PORT=3001
```

## API Endpoints

- `GET /api/health` - Check core status
- `POST /api/grievance` - Submit a new signal/grievance
- `GET /api/leaderboard` - Fetch top signal hunters
- `POST /api/leaderboard` - Submit a new score

## Game Controls

- `W A S D` - Move ASTRAX
- Collect purple signals to increase score and combo.
- Avoid red drones to survive.

## Deployment

- The frontend is ready for deployment on **Vercel** or **Netlify**. Ensure environment variables for the API URL are set in production if the backend is hosted separately.
- The backend is ready for **Render**, **Railway**, or **Heroku**.
