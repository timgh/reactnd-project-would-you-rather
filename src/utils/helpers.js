
export function calculatePercentage (count, total) {
  return total === 0 ? 0 : (count / total * 100).toFixed(1)
}