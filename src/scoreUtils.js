export function calculateScore(prediction, table) {
  // Simple scoring: 1 point for each correct position
  let score = 0;
  for (let i = 0; i < table.length; i++) {
    if (prediction[i] && prediction[i].toLowerCase() === table[i].name.toLowerCase()) {
      score++;
    }
  }
  return score;
}
