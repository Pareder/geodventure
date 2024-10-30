import { useParams } from 'react-router-dom'

import CopyButton from 'common/components/CopyButton'
import Loader from 'common/components/Loader'

export default function Online() {
  const { gameId } = useParams<{ gameId: string }>()

  return (
    <div className="max-w-[1024px] my-8 mx-auto p-6 flex flex-col items-center gap-4 border rounded-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Waiting for someone to join</h1>
      <p className="text-slate-300">Share this code to your friend:</p>
      <div className="flex gap-2">
        <p className="px-2 bg-secondary border border-slate-500 rounded-md text-2xl">{gameId}</p>
        <CopyButton
          size="icon"
          text={gameId!}
        />
      </div>
      <Loader size={40} />
    </div>
  )
}
