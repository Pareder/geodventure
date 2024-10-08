import { ReactNode, useMemo } from 'react'
import { useAuth } from 'common/services/auth'
import AccessType, * as accesses from './access'

type Props = {
  access: AccessType
  rule?: 'some' | 'every'
  fallback?: ReactNode
  children: ReactNode
}

export default function CheckAccess({ access, rule = 'some', fallback, children }: Props) {
  const { isAuthenticated } = useAuth()
  const level = useMemo(
    () => new Set([accesses.F_PUBLIC, isAuthenticated ? accesses.F_PROTECTED : accesses.F_UNAUTHORIZED]),
    [isAuthenticated],
  )

  return [access].flat()[rule]((a) => level.has(a)) ? children : fallback
}
