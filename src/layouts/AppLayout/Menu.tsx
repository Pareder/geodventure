import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import Avatar from 'common/components/Avatar'
import Button from 'common/components/Button'
import Icon from 'common/components/Icon'
import Typography from 'common/components/Typography'
import { useAuth } from 'common/services/auth'
import { auth } from 'common/services/firebase'
import styles from './AppLayout.module.css'

export default function Menu() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={wrapper}
      className={styles.menu}
      onClick={() => setOpen(!open)}
    >
      <Avatar
        size={40}
        text={user?.uid}
        className={styles.avatar}
      >
        {user?.displayName?.at(0)}
      </Avatar>
      {open && (
        <div className={styles.popover}>
          <div className={styles.info}>
            <Typography
              variant="h4"
              margin="s"
            >
              {user?.displayName}
            </Typography>
            <Typography
              variant="h6"
              color="grey"
            >
              {user?.email}
            </Typography>
          </div>
          <hr className={styles.divider} />
          <Link
            to="profile"
            className={styles.item}
          >
            <Icon
              name="user"
              size={20}
            />
            Profile
          </Link>
          <Button
            size="small"
            fullWidth
            className={styles.item}
            onClick={() => signOut(auth)}
          >
            <Icon
              name="logout"
              size={20}
            />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
