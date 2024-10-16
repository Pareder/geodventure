import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Loader from 'common/components/Loader'
import { Badge } from 'common/ui/badge'
import { GameType } from 'types'

dayjs.extend(localizedFormat)

type GamesHistoryProps = {
  games: GameType[]
  isLoading: boolean
}

export default function GamesHistory({ games, isLoading }: GamesHistoryProps) {
  return (
    <div className="max-h-[500px] p-4 flex flex-col gap-2 rounded-lg border overflow-auto">
      <h3 className="mb-2 text-xl font-semibold tracking-tight">Your Games</h3>
      {isLoading && <Loader size={48} />}
      {games.map((game, index) => (
        <div
          key={game.id}
          className="p-2 flex items-center gap-4 rounded-md bg-secondary"
        >
          <Badge>{index + 1}</Badge>
          <p className="font-semibold">{game.score.toLocaleString()} pts</p>
          <p className="ml-auto text-xs text-slate-300">{dayjs(game.date).format('LLL')}</p>
        </div>
      ))}
      {!games.length && !isLoading && <h3 className="text-xl font-semibold text-slate-300">There are no Games yet.</h3>}
    </div>
  )
}
