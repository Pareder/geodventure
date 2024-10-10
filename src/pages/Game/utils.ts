import { addDoc, collection } from 'firebase/firestore'
import { auth, firestore } from 'common/services/firebase'

export function calculateScore(distance: number) {
  const scalingFactor = 5000000
  const maxScore = 10000
  const score = maxScore * Math.exp(-distance / scalingFactor)
  return Math.round(score)
}

export function saveScore(score: number) {
  addDoc(collection(firestore, 'games'), {
    user: auth.currentUser?.uid,
    score,
    date: Date.now(),
  })
}
