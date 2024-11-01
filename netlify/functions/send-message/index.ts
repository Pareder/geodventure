import { Config } from '@netlify/functions'
import * as Ably from 'ably'
import { FieldValue } from 'firebase-admin/firestore'

import { USERS_LIMIT } from './consts'
import { ClientMessage, GameMessage, MessageType } from '../../../global'
import { MAX_ROUNDS } from '../../../src/common/consts/game'
import { calculateScore } from '../../../src/common/utils/game'
import { getFirestoreInstance, makeResponse } from '../../utils'

type Game = Omit<GameMessage, 'type'>

export default async function handler(req: Request) {
  const ABLY_API_KEY = Netlify.env.get('ABLY_API_KEY')

  if (!ABLY_API_KEY) {
    return makeResponse(
      { message: `Missing ABLY_API_KEY environment variable. If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key. If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY.` },
      500,
    )
  }

  const ably = new Ably.Realtime(ABLY_API_KEY)
  const channel = ably.channels.get('game')

  try {
    const body = await req.json() as ClientMessage
    const firestore = getFirestoreInstance()
    const docRef = firestore.collection('online').doc(body.id)

    if (body.type === MessageType.INIT) {
      await docRef.set(
        {
          round: 1,
          is_final: false,
          users: FieldValue.arrayUnion({
            id: body.uid,
            name: body.name,
            score: 0,
          }),
          answers: [],
        },
        { merge: true },
      )
      const game = (await docRef.get()).data() as Game
      if (!game.coordinates) {
        await channel.publish(body.id, { type: MessageType.COORDINATES_REQUEST })
      }
      if (game?.users.length === USERS_LIMIT) {
        await channel.publish(body.id, { type: MessageType.GAME, ...game })
      }
    }

    if (body.type === MessageType.UPDATE_COORDINATES) {
      await docRef.update({ coordinates: body.coordinates })
    }

    if (body.type === MessageType.CLICK) {
      const game = await firestore.runTransaction<Game>(async (transaction) => {
        const doc = await transaction.get(docRef)
        const game = doc.data() as Game
        const users = game.users.map((user) => {
          if (user.id !== body.uid) {
            return user
          }

          return {
            ...user,
            score: user.score + calculateScore(body.distance),
          }
        })
        const answers = [...game.answers, {
          uid: body.uid,
          username: body.username,
          coordinates: body.coordinates || null,
          distance: body.distance,
        }]
        const isFinal = game.round === MAX_ROUNDS
        transaction.update(docRef, { users, answers, is_final: isFinal })
        return { ...game, users, answers }
      })
      if (game?.answers.length === USERS_LIMIT) {
        await channel.publish(body.id, { type: MessageType.GAME, ...game })
      }
    }

    if (body.type === MessageType.NEXT) {
      const game = await firestore.runTransaction<Game>(async (transaction) => {
        const doc = await transaction.get(docRef)
        const game = doc.data() as Game
        const answers = game.answers.filter((answer) => answer.uid !== body.uid)
        const round = answers.length === 0 ? game.round + 1 : game.round
        const coordinates = body.coordinates ? body.coordinates : game.coordinates
        transaction.update(docRef, { round, answers, coordinates })
        return { ...game, round, answers, coordinates }
      })
      if (game?.answers.length === 0) {
        await channel.publish(body.id, { type: MessageType.GAME, ...game })
      }
    }

    if (body.type === MessageType.RESTART) {
      const game = await firestore.runTransaction<Game>(async (transaction) => {
        const doc = await transaction.get(docRef)
        const game = doc.data() as Game
        const newGame = {
          round: 1,
          is_final: false,
          users: game.users.map((user) => user.id === body.uid ? { ...user, score: 0 } : user),
          answers: game.answers.filter((answer) => answer.uid !== body.uid),
          coordinates: body.coordinates ? body.coordinates : game.coordinates,
        }
        transaction.update(docRef, newGame)
        return newGame
      })
      if (game?.answers.length === 0) {
        await channel.publish(body.id, { type: MessageType.GAME, ...game })
      }
    }

    if (body.type === MessageType.LEAVE) {
      await docRef.delete()
      await channel.publish(body.id, { type: MessageType.USER_LEFT })
    }
  } catch (err) {
    ably.close()
    return makeResponse(
      { message: (err as Error)?.message || 'Something went wrong' },
      500,
    )
  }

  ably.close()

  return makeResponse({ message: 'OK' })
}

export const config: Config = {
  method: 'POST',
}
