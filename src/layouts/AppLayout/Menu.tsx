import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import Avatar from 'common/components/Avatar'
import Button from 'common/components/Button'
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
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0h48v48H0z"
                fill="none"
              />
              <g>
                <path
                  d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12
		c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8
		s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z"
                />
              </g>
            </svg>
            Profile
          </Link>
          <Button
            size="small"
            fullWidth
            className={styles.item}
            onClick={() => signOut(auth)}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.707,8.707,5.414,11H17a1,1,0,0,1,0,2H5.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.414l4-4A1,1,0,1,1,7.707,8.707ZM21,1H13a1,1,0,0,0,0,2h7V21H13a1,1,0,0,0,0,2h8a1,1,0,0,0,1-1V2A1,1,0,0,0,21,1Z" />
            </svg>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
