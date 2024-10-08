export function formatDistance(value: number) {
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + ' km'
  } else {
    return value.toFixed(2) + ' m'
  }
}
