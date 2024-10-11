import { useEffect, useState } from 'react'
import Avatar from 'common/components/Avatar'
import Loader from 'common/components/Loader'
import Typography from 'common/components/Typography'
import { useAuth } from 'common/services/auth'
import cx from 'common/utils/classnames'
import { GameType } from 'types'
import { getLeaderboard } from './utils'
import styles from './Profile.module.css'

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
    <div className={styles.leaderboard}>
      <Typography
        variant="h3"
        margin="m"
      >
        Leaderboard
      </Typography>
      {isLoading && <Loader />}
      {leaderboard.map((game, index) => (
        <div
          key={game.id}
          className={styles.game}
        >
          <Typography
            variant="h4"
            className={cx(styles.count, styles.board)}
          >
            {index + 1}
          </Typography>
          <div className={styles.username}>
            <Avatar
              size={32}
              text={game.user}
              className={styles.avatar}
            >
              {(game.username || game.user).charAt(0)}
            </Avatar>
            <Typography variant="h4">{game.username}</Typography>
            {game.user === user?.uid && (
              <Typography
                variant="h5"
                color="grey"
              >
                (You)
              </Typography>
            )}
          </div>
          <Typography
            variant="h4"
            className={styles.score}
          >
            {game.score.toLocaleString()} pts
          </Typography>
        </div>
      ))}
      {!leaderboard.length && !isLoading && (
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
