# Premier League Prediction Tracker

## System Overview
This is a React-based web app for tracking and scoring Premier League table predictions between two users. The app fetches the live Premier League table, allows users to input their predicted standings, and calculates scores based on prediction accuracy.

## Features
- Fetches live Premier League table (via football-data.org API)
- Users enter their predicted team order for all 20 positions
- Scores are calculated weekly by comparing predictions to the actual table
- Fluid, modern UI

## User Flow
1. **Home Page**: Displays the current Premier League table.
2. **Prediction Form**: Each user enters their name and predicted order of teams (1-20).
3. **Score Calculation**: The app compares each user's predictions to the live table and displays points earned for correct positions.
4. **Weekly Update**: As the table updates, users can see their new scores.

## How It Works
- The app fetches the table from a public API (football-data.org). If unavailable, it uses fallback data.
- Users submit their predictions via a form.
- The scoring system awards 1 point for each team placed in the correct position.

## Setup Instructions
1. Install dependencies: `npm install`
2. Add your football-data.org API key to `src/fetchTable.js`
3. Start the app: `npm run dev`

## Flow Diagram
See `docs/use_flow_diagram.py` for a script to generate a flow diagram.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
