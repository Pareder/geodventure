import { FormEvent, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'
import Alert from 'common/components/Alert'
import Button from 'common/components/Button'
import Input from 'common/components/Input'
import { auth } from 'common/services/firebase'
import styles from './Signup.module.css'
import GoogleSignup from '../components/GoogleSignup'

export default function Signup() {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!nickname || !email || !password || !repeatPassword || password !== repeatPassword) return

    setLoading(true)
    setError(false)
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: nickname })
        enqueueSnackbar('Account created', { variant: 'success' })
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="nickname"
          label="Nickname"
          type="text"
          value={nickname}
          required
          placeholder="Nickname"
          className={styles.field}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          id="email-address"
          label="Email address"
          type="email"
          value={email}
          required
          placeholder="email@example.com"
          className={styles.field}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          required
          placeholder="********"
          className={styles.field}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          id="repeatPassword"
          label="Repeat Password"
          type="password"
          value={repeatPassword}
          required
          placeholder="********"
          className={styles.field}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {isError && (
          <Alert
            severity="error"
            className={styles.field}
          >
            Something went wrong
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          className={styles.field}
          disabled={isLoading}
        >
          Sign up
        </Button>
        <GoogleSignup
          label="Sign Up with Google"
          fullWidth
          className={styles.field}
        />
      </form>
      Already have an account? <NavLink to="/auth/login">Sign in</NavLink>
    </>
  )
}
