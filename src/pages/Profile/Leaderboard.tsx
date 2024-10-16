import { useEffect, useState } from 'react'
import Loader from 'common/components/Loader'
import { useAuth } from 'common/services/auth'
import { Avatar, AvatarFallback } from 'common/ui/avatar'
import { Badge } from 'common/ui/badge'
import { GameType } from 'types'
import { getLeaderboard } from './utils'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<GameType[]>([])
  const [isLoading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    getLeaderboard()
      .then((leaderboard) => setLeaderboard(leaderboard))
      .finally(() => setLoading(false))
  }, [user?.displayName])

  return (
    <div className="max-h-[500px] p-4 flex flex-col gap-2 rounded-lg border overflow-auto">
      <h3 className="mb-2 text-xl font-semibold tracking-tight">Leaderboard</h3>
      {isLoading && <Loader size={48} />}
      {leaderboard.map((game, index) => (
        <div
          key={game.id}
          className="p-2 flex items-center gap-4 rounded-md bg-secondary"
        >
          <Badge>{index + 1}</Badge>
          <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className="h-6 w-6">
              <AvatarFallback
                className="text-xs bg-background"
                text={game.username || game.user}
              />
            </Avatar>
            <p className="font-semibold text-ellipsis overflow-hidden">{game.username}</p>
            {game.user === user?.uid && <p className="text-sm text-slate-300">(You)</p>}
          </div>
          <p className="ml-auto shrink-0 font-semibold">{game.score.toLocaleString()} pts</p>
        </div>
      ))}
      {!leaderboard.length && !isLoading && (
        <h3 className="text-xl font-semibold text-slate-300">There are no Games yet.</h3>
      )}
    </div>
  )
}
