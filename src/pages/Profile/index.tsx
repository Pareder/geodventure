import { useEffect, useState } from 'react'
import { useAuth } from 'common/services/auth'
import Avatar from 'common/components/Avatar'
import Typography from 'common/components/Typography'
import { GameType } from 'types'
import EditableName from './EditableName'
import GamesHistory from './GamesHistory'
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import { getGames } from './utils'
import styles from './Profile.module.css'

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
    <div className={styles.wrapper}>
      <Typography
        variant="h2"
        margin="l"
      >
        Profile
      </Typography>
      <div className={styles.user}>
        <Avatar
          size={80}
          text={user?.uid}
        >
          {user?.displayName?.at(0)}
        </Avatar>
        <div>
          <EditableName defaultName={user?.displayName} />
          <Typography
            variant="p"
            color="grey"
          >
            {user?.email}
          </Typography>
        </div>
      </div>
      <Typography
        variant="h3"
        margin="m"
      >
        Statistics
      </Typography>
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
