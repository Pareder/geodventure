import { toast } from 'sonner'

import { ClientMessage } from '../../../global'

export default function sendMessage(message: ClientMessage) {
  return fetch(`/.netlify/functions/send-message`, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => toast.error(error.message))
}
