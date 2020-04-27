
export function calculatePercentage (count, total) {
  //console.log("calculatePercentage")
  //console.log(count / total * 100)
  return total === 0 ? 0 : (count / total * 100).toFixed(1)
}