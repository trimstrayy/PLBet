import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './PredictionForm.css';

function getSafe(obj, path, fallback = '') {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback;
}

export default function PredictionForm({ teams, onSubmit }) {
  const [user, setUser] = useState('');
  const [orderedTeams, setOrderedTeams] = useState([]);

  useEffect(() => {
    setOrderedTeams(teams);
  }, [teams]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(orderedTeams);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setOrderedTeams(newOrder);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    onSubmit({ user, predictions: orderedTeams.map(team => getSafe(team, ['team', 'shortName'], team.name)) });
  };

  return (
    <form onSubmit={handleSubmit} className="prediction-form-card bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-white">Create Your Predicted Table</h2>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={e => setUser(e.target.value)}
        required
        className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-800 text-white"
      />
      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="teams">
            {(provided) => (
              <table className="w-full border-collapse text-white" ref={provided.innerRef} {...provided.droppableProps}>
                <thead>
                  <tr className="bg-gray-800">
                    <th className="py-2 px-3">Pos</th>
                    <th className="py-2 px-3">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedTeams.map((team, idx) => (
                    <Draggable key={getSafe(team, ['team', 'id'], idx)} draggableId={String(getSafe(team, ['team', 'id'], idx))} index={idx}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                        >
                          <td className="py-2 px-3 font-bold">{idx + 1}</td>
                          <td className="py-2 px-3 flex items-center gap-2 font-bold">
                            <img src={getSafe(team, ['team', 'crest'])} alt={getSafe(team, ['team', 'shortName'])} className="w-6 h-6 object-contain mr-2" />
                            <span>{getSafe(team, ['team', 'shortName'], team.name)}</span>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <button type="submit" className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Submit Prediction</button>
    </form>
  );
}
