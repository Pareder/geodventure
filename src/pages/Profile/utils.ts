import dayjs from 'dayjs'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

import { GameType, UserType } from 'types'
import { firestore } from 'common/services/firebase'

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

export function getLeaderboard() {
  return Promise.all([
    getDocs(query(collection(firestore, 'games'), orderBy('score', 'desc'), limit(10))),
    getDocs(query(collection(firestore, 'users'))),
  ]).then(([leaderboardSnapshot, usersSnapshot]) => {
    const users = usersSnapshot.docs.reduce<Record<string, UserType>>(
      (obj, doc) => ({
        ...obj,
        [doc.id]: doc.data() as UserType,
      }),
      {},
    )

    return leaderboardSnapshot.docs.map((doc) => {
      const game = doc.data() as GameType
      return {
        ...game,
        id: doc.id,
        username: users[game.user]?.name,
      }
    })
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
