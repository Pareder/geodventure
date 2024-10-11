import dayjs from 'dayjs'
import { GameType } from 'types'

export function getTotalScore(games: Pick<GameType, 'score'>[]) {
  return games.reduce((acc, game) => acc + game.score, 0)
}

export function getStreak(games: Pick<GameType, 'date'>[]) {
  let streak = 0
  for (let i = 0; i < games.length; i++) {
    const previousDate = dayjs(games[i - 1]?.date).startOf('d')
    const currentDate = dayjs(games[i].date).startOf('d')
    const difference = previousDate.diff(currentDate, 'd')
    if (difference === 1 || (i === 0 && difference === 0)) {
      streak += 1
    }

    if (difference > 1) {
      break
    }
  }

  return streak
}
