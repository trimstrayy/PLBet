import React, { useState, useEffect } from 'react';
import PremierLeagueTable from './PremierLeagueTable';
import PredictionForm from './PredictionForm';
import { calculateScore } from './scoreUtils';
import { fetchPremierLeagueTable } from './fetchTable';
import './index.css';

const fallbackTable = [
  { name: 'Man City', played: 1, points: 3 },
  { name: 'Arsenal', played: 1, points: 3 },
  { name: 'Liverpool', played: 1, points: 3 },
  { name: 'Chelsea', played: 1, points: 3 },
  { name: 'Tottenham', played: 1, points: 3 },
  { name: 'Man United', played: 1, points: 3 },
  { name: 'Newcastle', played: 1, points: 3 },
  { name: 'Aston Villa', played: 1, points: 3 },
  { name: 'Brighton', played: 1, points: 3 },
  { name: 'West Ham', played: 1, points: 3 },
  { name: 'Brentford', played: 1, points: 3 },
  { name: 'Crystal Palace', played: 1, points: 3 },
  { name: 'Everton', played: 1, points: 3 },
  { name: 'Fulham', played: 1, points: 3 },
  { name: 'Bournemouth', played: 1, points: 3 },
  { name: 'Wolves', played: 1, points: 3 },
  { name: 'Burnley', played: 1, points: 3 },
  { name: 'Sheffield United', played: 1, points: 3 },
  { name: 'Nottingham Forest', played: 1, points: 3 },
  { name: 'Luton Town', played: 1, points: 3 },
];

function App() {
  const [table, setTable] = useState(fallbackTable);
  const [predictions, setPredictions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function getTable() {
      const liveTable = await fetchPremierLeagueTable();
      if (liveTable && liveTable.length) {
        setTable(liveTable);
      } else {
        setTable(fallbackTable);
      }
    }
    getTable();
  }, []);

  const handlePrediction = ({ user, predictions: userPred }) => {
    setPredictions(prev => {
      const filtered = prev.filter(p => p.user !== user);
      return [...filtered, { user, predictions: userPred }];
    });
    setShowForm(false); // Hide form after submit
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Challenge</h1>
      <PremierLeagueTable table={table} />
      {!showForm && (
        <div className="text-center my-8">
          <button onClick={() => setShowForm(true)} className="px-6 py-3 text-lg rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Add Your List
          </button>
        </div>
      )}
      {showForm && <PredictionForm onSubmit={handlePrediction} />}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Scores</h2>
        <ul>
          {predictions.map(({ user, predictions: pred }) => (
            <li key={user} className="mb-1 text-gray-800">
              <strong>{user}:</strong> {calculateScore(pred, table)} points this week
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
