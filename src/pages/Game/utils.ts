import { addDoc, collection } from 'firebase/firestore'

import { auth, firestore } from 'common/services/firebase'

export function saveScore(score: number) {
  addDoc(collection(firestore, 'games'), {
    user: auth.currentUser?.uid,
    score,
    date: Date.now(),
  })
}
