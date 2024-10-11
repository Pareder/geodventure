import { ReactNode } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Button, { ButtonProps } from 'common/components/Button'
import Icon from 'common/components/Icon'
import { auth } from 'common/services/firebase'
import createUser from '../../utils/createUser'

type GoogleSignupProps = ButtonProps & {
  label: ReactNode
}

export default function GoogleSignup({ label, ...props }: GoogleSignupProps) {
  const handleClick = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(({ user }) => {
      createUser(user.uid, user.displayName || user.email || '')
    })
  }

  return (
    <Button
      {...props}
      type="button"
      variant="secondary"
      onClick={handleClick}
    >
      <Icon
        name="google"
        size={24}
      />
      {label}
    </Button>
  )
}
