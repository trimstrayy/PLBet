import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || 'b4762a678c0e4db8a9bfa344e9473ed4';

app.use(cors());

app.get('/api/epl-table', async (req, res) => {
  try {
    const url = 'https://api.football-data.org/v4/competitions/PL/standings';
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch table' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
