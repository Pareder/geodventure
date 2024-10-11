import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Loader from 'common/components/Loader'
import Typography from 'common/components/Typography'
import { GameType } from 'types'
import styles from './Profile.module.css'

dayjs.extend(localizedFormat)

type GamesHistoryProps = {
  games: GameType[]
  isLoading: boolean
}

export default function GamesHistory({ games, isLoading }: GamesHistoryProps) {
  return (
    <div className={styles.history}>
      <Typography
        variant="h3"
        margin="m"
      >
        Your Games
      </Typography>
      {isLoading && <Loader />}
      {games.map((game, index) => (
        <div
          key={game.id}
          className={styles.game}
        >
          <Typography
            variant="h4"
            className={styles.count}
          >
            {index + 1}
          </Typography>
          <Typography variant="h4">{game.score.toLocaleString()} pts</Typography>
          <Typography
            variant="p"
            color="grey"
            className={styles.date}
          >
            {dayjs(game.date).format('LLL')}
          </Typography>
        </div>
      ))}
      {!games.length && !isLoading && (
        <Typography
          variant="h3"
          color="grey"
        >
          There are no Games yet.
        </Typography>
      )}
    </div>
  )
}
