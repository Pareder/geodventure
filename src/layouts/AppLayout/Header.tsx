import { Link } from 'react-router-dom'
import { useAuth } from 'common/services/auth'
import Button from 'common/components/Button'
import Avatar from './Avatar'
import styles from './AppLayout.module.css'

const logo = new URL('/logo.svg', import.meta.url).href

export default function Header() {
  const { user } = useAuth()

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.link}
      >
        <img
          src={logo}
          alt="Geodventure"
          width={48}
          height={48}
        />
        <h2 className={styles.title}>Geodventure</h2>
      </Link>
      <div className={styles.right}>
        {user ? (
          <Avatar />
        ) : (
          <>
            <Button
              to="/auth/login"
              variant="secondary"
            >
              Login
            </Button>
            <Button to="/auth/signup">Sign Up</Button>
          </>
        )}
      </div>
    </header>
  )
}
