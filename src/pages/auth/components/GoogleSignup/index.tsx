import { ReactNode } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import Icon from 'common/components/Icon'
import { auth } from 'common/services/firebase'
import { Button, ButtonProps } from 'common/ui/button'

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
      variant="outline"
      onClick={handleClick}
    >
      <Icon
        name="google"
        className="mr-2 h-4 w-4"
      />
      {label}
    </Button>
  )
}
