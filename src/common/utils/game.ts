export function calculateScore(distance: number) {
  const scalingFactor = 5000000
  const maxScore = 10000
  const score = maxScore * Math.exp(-distance / scalingFactor)
  return Math.round(score)
}
