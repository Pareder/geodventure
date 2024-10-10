import { useAuth } from 'common/services/auth'

export default function Profile() {
  const { user } = useAuth()
  return user?.displayName
}
