import { ReactNode } from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from 'common/services/firebase'
import { Button, ButtonProps } from 'common/ui/button'

import createUser from '../../utils/createUser'

type GoogleSignupProps = ButtonProps & {
  label: ReactNode
}

export default function GithubSignup({ label, ...props }: GoogleSignupProps) {
  const handleClick = () => {
    const provider = new GithubAuthProvider()
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
      <GitHubLogoIcon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
