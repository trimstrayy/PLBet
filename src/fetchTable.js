export async function fetchPremierLeagueTable() {
  const url = 'http://localhost:4000/api/epl-table';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch table');
    const data = await res.json();
    // Use all fields for full table UI
    return data.standings[0].table;
  } catch (err) {
    console.error('Error fetching table:', err);
    return [];
  }
}
