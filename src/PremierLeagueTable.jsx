import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './PremierLeagueTable.css';

function getSafe(obj, path, fallback = '') {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback;
}

export default function PremierLeagueTable({ table }) {
  const [expanded, setExpanded] = useState(false);
  const visibleTeams = expanded ? table : table.slice(0, 6);

  return (
    <div className="pl-table-container bg-gray-900 rounded-xl shadow-lg p-4 mb-8 relative">
      <h2 className="text-2xl font-bold text-white mb-4">Premier League Table</h2>
      <table className="pl-table w-full border-collapse text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-3">#</th>
            <th className="py-2 px-3">Club</th>
            <th className="py-2 px-3">M</th>
            <th className="py-2 px-3">W</th>
            <th className="py-2 px-3">D</th>
            <th className="py-2 px-3">L</th>
            <th className="py-2 px-3">GF</th>
            <th className="py-2 px-3">GA</th>
            <th className="py-2 px-3">GD</th>
            <th className="py-2 px-3">Pts</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(visibleTeams) && visibleTeams.map((team, idx) => (
            <tr key={getSafe(team, ['team', 'id'], idx)} className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
              <td className="py-2 px-3 font-bold">{team.position}</td>
              <td className="py-2 px-3 flex items-center gap-2 font-bold">
                <img src={getSafe(team, ['team', 'crest'])} alt={getSafe(team, ['team', 'shortName'])} className="w-5 h-5 inline-block mr-2 object-contain" style={{width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px'}} />
                <span>{getSafe(team, ['team', 'shortName'], team.name)}</span>
              </td>
              <td className="py-2 px-3">{team.playedGames}</td>
              <td className="py-2 px-3">{team.won}</td>
              <td className="py-2 px-3">{team.draw}</td>
              <td className="py-2 px-3">{team.lost}</td>
              <td className="py-2 px-3">{team.goalsFor}</td>
              <td className="py-2 px-3">{team.goalsAgainst}</td>
              <td className="py-2 px-3">{team.goalDifference}</td>
              <td className="py-2 px-3 font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!expanded && (
        <button
          className="absolute left-1/2 bottom-2 -translate-x-1/2 bg-transparent text-white p-0 border-none shadow-none flex items-center justify-center"
          onClick={() => setExpanded(true)}
          aria-label="Show All"
    
          style={{outline: 'none'}}
        >
          <FaChevronDown size={28} />
        </button>
      )}
      {expanded && (
        <button
          className="absolute left-1/2 bottom-2 -translate-x-1/2 bg-transparent text-white p-0 border-none shadow-none flex items-center justify-center"
          onClick={() => setExpanded(false)}
          aria-label="Show Top 6"   
          style={{outline: 'none'}}
        >
          <FaChevronDown size={28} style={{ transform: 'rotate(180deg)' }} />
        </button>
      )}
    </div>
  );
}
