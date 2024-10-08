export function secondsToTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const formattedMins = String(mins).padStart(2, '0')
  const formattedSecs = String(secs).padStart(2, '0')

  return `${formattedMins}:${formattedSecs}`
}
