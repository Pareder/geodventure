import { FormEvent, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'
import Button from 'common/components/Button'
import Input from 'common/components/Input'
import { auth } from 'common/services/firebase'
import styles from './Signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password || !repeatPassword || password !== repeatPassword) return

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      enqueueSnackbar('Account created', { variant: 'success' })
    })
  }

  return (
    <>
      <h1>Sign Up</h1>
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
        <Button
          type="submit"
          fullWidth
          className={styles.field}
        >
          Sign up
        </Button>
      </form>
      Already have an account? <NavLink to="/auth/login">Sign in</NavLink>
    </>
  )
}
