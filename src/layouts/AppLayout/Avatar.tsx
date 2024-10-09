import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import Button from 'common/components/Button'
import { useAuth } from 'common/services/auth'
import { auth } from 'common/services/firebase'
import styles from './AppLayout.module.css'

export default function Avatar() {
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
      className={styles.avatar}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.user}>{user?.displayName?.at(0)}</div>
      {open && (
        <div className={styles.popover}>
          <p className={styles.name}>{user?.displayName}</p>
          <p className={styles.email}>{user?.email}</p>
          <hr className={styles.divider} />
          <Button
            variant="secondary"
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
