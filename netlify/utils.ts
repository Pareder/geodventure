import { App, cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export function makeResponse(data: unknown, status?: number) {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status })
}

let app: App

export function getFirestoreInstance() {
  const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS
  if (!FIREBASE_CREDENTIALS) {
    throw new Error('Firebase is not set up correctly')
  }

  if (!app) {
    app = initializeApp({
      credential: cert(JSON.parse(FIREBASE_CREDENTIALS)),
    })
  }

  return getFirestore(app)
}
