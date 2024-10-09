import { NavLink } from 'react-router-dom'
import StreetMap from 'common/components/StreetMap'
import CheckAccess, { access } from 'common/access'
import Button from 'common/components/Button'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <StreetMap />
      <div className={styles.info}>
        <CheckAccess
          access={access.F_PROTECTED}
          fallback={
            <p className={styles.text}>
              <NavLink to="/auth/login">Log in</NavLink> to play
            </p>
          }
        >
          <Button to="/game">Play</Button>
        </CheckAccess>
      </div>
    </>
  )
}
