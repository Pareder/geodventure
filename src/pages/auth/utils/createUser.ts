import { doc, setDoc } from 'firebase/firestore'
import { firestore } from 'common/services/firebase'

export default function createUser(id: string, name: string) {
  return setDoc(doc(firestore, 'users', id), {
    name,
  })
}
