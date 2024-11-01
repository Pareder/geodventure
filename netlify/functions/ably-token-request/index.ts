import { Context, HandlerEvent } from '@netlify/functions'
import * as Ably from 'ably'

import { makeResponse } from '../../utils'

export default async function handler(_: HandlerEvent, context: Context) {
  const ABLY_API_KEY = Netlify.env.get('ABLY_API_KEY')

  if (!ABLY_API_KEY) {
    return makeResponse(
      { message: `Missing ABLY_API_KEY environment variable. If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key. If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY.` },
      500
    )
  }

  const clientId = context.url.searchParams.get('clientId') || Netlify.env.get('DEFAULT_CLIENT_ID') || 'NO_CLIENT_ID'
  const client = new Ably.Rest(ABLY_API_KEY)
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId })
  return makeResponse(tokenRequestData)
}
