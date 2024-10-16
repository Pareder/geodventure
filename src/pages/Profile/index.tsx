import { useEffect, useState } from 'react'

import { GameType } from 'types'
import { useAuth } from 'common/services/auth'
import { Avatar, AvatarFallback } from 'common/ui/avatar'

import EditableName from './EditableName'
import GamesHistory from './GamesHistory'
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import { getGames } from './utils'

export default function Profile() {
  const [games, setGames] = useState<GameType[]>([])
  const [isLoading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return

    getGames(user.uid)
      .then((games) => setGames(games))
      .finally(() => setLoading(false))
  }, [user?.uid])

  return (
    <div className="max-w-[1024px] my-8 mx-auto p-6 flex flex-col gap-4 border rounded-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback
            className="text-3xl"
            text={user?.displayName}
          />
        </Avatar>
        <div className="w-auto">
          <EditableName defaultName={user?.displayName} />
          <p className="text-slate-300">{user?.email}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">Statistics</h3>
      <Statistics
        games={games}
        isLoading={isLoading}
      />
      <GamesHistory
        games={games}
        isLoading={isLoading}
      />
      <Leaderboard />
    </div>
  )
}
