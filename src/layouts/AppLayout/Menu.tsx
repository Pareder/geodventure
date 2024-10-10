import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import Avatar from 'common/components/Avatar'
import Button from 'common/components/Button'
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
        className={styles.avatar}
      >
        {user?.displayName?.at(0)}
      </Avatar>
      {open && (
        <div className={styles.popover}>
          <p className={styles.name}>{user?.displayName}</p>
          <p className={styles.email}>{user?.email}</p>
          <hr className={styles.divider} />
          <Button
            variant="secondary"
            size="small"
            fullWidth
            onClick={() => signOut(auth)}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
