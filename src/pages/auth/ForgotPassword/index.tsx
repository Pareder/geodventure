import { FormEvent, useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useSnackbar } from 'notistack'
import { NavLink } from 'react-router-dom'
import Alert from 'common/components/Alert'
import Button from 'common/components/Button'
import Input from 'common/components/Input'
import { auth } from 'common/services/firebase'
import styles from './ForgotPassword.module.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError(false)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        enqueueSnackbar('Reset password email sent', { variant: 'success' })
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <h1>Reset your password</h1>
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
          Reset Password
        </Button>
      </form>
      <NavLink to="/auth/login">Back to Login</NavLink>
    </>
  )
}
