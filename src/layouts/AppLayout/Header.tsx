import { Link } from 'react-router-dom'
import { useAuth } from 'common/services/auth'
import { buttonVariants } from 'common/ui/button'
import Menu from './Menu'

const logo = new URL('/logo.svg', import.meta.url).href

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="flex h-16 items-center px-4 shrink-0 border-b">
      <Link
        to="/"
        className="flex items-center gap-2"
      >
        <img
          src={logo}
          alt="Geodventure"
          width={48}
          height={48}
        />
        <h1 className="text-3xl font-semibold tracking-tight">Geodventure</h1>
      </Link>
      <div className="ml-auto flex gap-2">
        {user ? (
          <Menu />
        ) : (
          <>
            <Link
              to="/auth/login"
              className={buttonVariants({ variant: 'default' })}
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
