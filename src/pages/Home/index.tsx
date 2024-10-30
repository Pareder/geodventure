import { Link } from 'react-router-dom'

import CheckAccess, { access } from 'common/access'
import StreetMap from 'common/components/StreetMap'
import { buttonVariants } from 'common/ui/button'

import OnlineDialog from './OnlineDialog'

export default function Home() {
  return (
    <>
      <StreetMap />
      <div className="absolute z-10 top-4 left-1/2 -translate-x-1/2 w-full max-w-sm flex gap-4 [&>*]:flex-1 p-2 border bg-background rounded-md">
        <CheckAccess
          access={access.F_PROTECTED}
          fallback={
            <Link
              to="/auth/login"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              Sign In to Play
            </Link>
          }
        >
          <Link
            to="/game"
            className={buttonVariants({ size: 'lg' })}
          >
            Play
          </Link>
          <OnlineDialog />
        </CheckAccess>
      </div>
    </>
  )
}
