import { useState } from 'react';

export default function PredictionForm({ onSubmit }) {
  const [predictions, setPredictions] = useState(Array(20).fill(''));
  const [user, setUser] = useState('');

  const handleChange = (idx, value) => {
    const newPredictions = [...predictions];
    newPredictions[idx] = value;
    setPredictions(newPredictions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    onSubmit({ user, predictions });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Enter Your Predicted Table</h2>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={e => setUser(e.target.value)}
        required
        className="mb-4 p-2 border border-blue-300 rounded w-full"
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        {predictions.map((team, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Position ${idx+1} team name`}
            value={team}
            onChange={e => handleChange(idx, e.target.value)}
            required
            className="p-2 border border-purple-300 rounded"
          />
        ))}
      </div>
      <small className="block mb-2 text-gray-500">Enter the team name for each position (1 = top, 20 = bottom)</small>
      <button type="submit" className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Submit Prediction</button>
    </form>
  );
}
