import { Link } from 'react-router-dom'

import CheckAccess, { access } from 'common/access'
import StreetMap from 'common/components/StreetMap'
import { buttonVariants } from 'common/ui/button'

export default function Home() {
  return (
    <>
      <StreetMap />
      <div className="absolute z-10 top-4 left-1/2 -translate-x-1/2">
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
            className={buttonVariants({ variant: 'secondary', size: 'lg' })}
          >
            Play
          </Link>
        </CheckAccess>
      </div>
    </>
  )
}
