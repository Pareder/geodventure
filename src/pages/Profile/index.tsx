import { useAuth } from 'common/services/auth'
import Avatar from 'common/components/Avatar'
import Typography from 'common/components/Typography'
import Statistics from './Statistics'
import styles from './Profile.module.css'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className={styles.wrapper}>
      <Typography
        variant="h2"
        margin="l"
      >
        Profile
      </Typography>
      <div className={styles.user}>
        <Avatar size={80}>{user?.displayName?.at(0)}</Avatar>
        <div>
          <Typography
            variant="h3"
            margin="xs"
          >
            {user?.displayName}
          </Typography>
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
      <Statistics />
    </div>
  )
}
