import { FormEvent, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'
import Button from 'common/components/Button'
import Input from 'common/components/Input'
import { auth } from 'common/services/firebase'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        enqueueSnackbar('Logged in', { variant: 'success' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          fullWidth
          className={styles.field}
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
      No account yet? <NavLink to="/auth/signup">Sign up</NavLink>
    </>
  )
}
