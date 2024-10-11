import dayjs from 'dayjs'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from 'common/services/firebase'
import { GameType } from 'types'

export function getGames(id: string) {
  return getDocs(query(collection(firestore, 'games'), where('user', '==', id))).then((snapshot) => {
    return snapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as GameType,
      )
      .sort((a, b) => b.date - a.date)
  })
}

export function getTotalScore(games: Pick<GameType, 'score'>[]) {
  return games.reduce((acc, game) => acc + game.score, 0)
}

export function getStreak(games: Pick<GameType, 'date'>[]) {
  const sortedByDate = games.sort((a, b) => b.date - a.date)
  let streak = 0
  for (let i = 0; i < sortedByDate.length; i++) {
    const previousDate = dayjs(sortedByDate[i - 1]?.date).startOf('d')
    const currentDate = dayjs(sortedByDate[i].date).startOf('d')
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
