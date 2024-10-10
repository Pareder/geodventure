import { GameType } from 'types'

export function getTotalScore(games: GameType[]) {
  return games.reduce((acc, game) => acc + game.score, 0)
}

export function getStreak(games: GameType[]): number {
  if (games.length === 0) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const firstGameDate = new Date(games[0].date)
  firstGameDate.setHours(0, 0, 0, 0)

  if (firstGameDate.getTime() < yesterday.getTime()) {
    return 0
  }

  let streak = 1
  for (let i = 1; i < games.length; i++) {
    const currentDate = new Date(games[i - 1].date)
    const previousDate = new Date(games[i].date)

    const daysDifference = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDifference === 1) {
      streak++
    } else if (daysDifference > 1) {
      break
    }
  }

  return streak
}
