import { useEffect, useRef, useState } from 'react'
import { useChannel } from 'ably/react'
import { Link, useParams } from 'react-router-dom'

import CopyButton from 'common/components/CopyButton'
import Loader from 'common/components/Loader'
import StreetMap from 'common/components/StreetMap'
import { getStreetView, setStreetView } from 'common/components/StreetMap/utils'
import { MAX_ROUNDS, TIME } from 'common/consts/game'
import { useAuth } from 'common/services/auth'
import { secondsToTime } from 'common/utils/time'

import sendMessage from './sendMessage'
import SmallMap from './SmallMap'
import UsersScore from './UsersScore'
import { GameMessage, MessageType, ServerMessage } from '../../../global'
import { Button, buttonVariants } from '../../common/ui/button.tsx'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../common/ui/dialog.tsx'

export default function Online() {
  const [timer, setTimer] = useState(TIME)
  const [game, setGame] = useState<GameMessage>()
  const [loading, setLoading] = useState(false)
  const timerInterval = useRef<NodeJS.Timeout>()
  const { gameId = '' } = useParams()
  const { user } = useAuth()

  const handleMapClick = ({ coordinates, distance }: { coordinates?: google.maps.LatLngLiteral; distance: number }) => {
    clearInterval(timerInterval.current)
    sendMessage({
      id: gameId,
      type: MessageType.CLICK,
      uid: user!.uid!,
      username: user!.displayName!,
      coordinates,
      distance,
    })
  }

  const handleNext = () => {
    setLoading(true)
    if (user?.uid === game?.users[0].id) {
      return getStreetView((coordinates) => {
        sendMessage({ id: gameId, type: MessageType.NEXT, uid: user!.uid!, coordinates }).catch(() => setLoading(false))
      })
    }

    sendMessage({ id: gameId, type: MessageType.NEXT, uid: user!.uid! }).catch(() => setLoading(false))
  }

  useChannel('game', gameId, (message) => {
    const data = message.data as ServerMessage
    if (data.type === MessageType.COORDINATES_REQUEST) {
      getStreetView((coordinates) => {
        sendMessage({ id: gameId, type: MessageType.UPDATE_COORDINATES, coordinates })
      })
    }

    if (data.type === MessageType.GAME) {
      setGame(data)
      setLoading(false)

      if (!data.is_final) {
        setTimer(TIME)
        setStreetView(data.coordinates)
        timerInterval.current = setInterval(() => {
          setTimer((timer) => {
            if (timer === 0) {
              handleMapClick({ distance: Number.MAX_SAFE_INTEGER })
              return timer
            }

            return timer - 1
          })
        }, 1000)
      }
    }
  })

  useEffect(() => {
    sendMessage({ id: gameId, type: MessageType.INIT, uid: user!.uid, name: user!.displayName! })

    return () => clearInterval(timerInterval.current)
  }, [])

  if (!game?.users?.length) {
    return (
      <div className="max-w-[1024px] my-8 mx-auto p-6 flex flex-col items-center gap-4 border rounded-lg">
        <h1 className="text-2xl font-semibold tracking-tight">Waiting for someone to join</h1>
        <p className="text-slate-300">Share this code to your friend:</p>
        <div className="flex gap-2">
          <p className="px-2 bg-secondary border border-slate-500 rounded-md text-2xl">{gameId}</p>
          <CopyButton
            size="icon"
            text={gameId}
          />
        </div>
        <Loader size={40} />
      </div>
    )
  }

  return (
    <>
      <div className="absolute z-10 top-4 left-1/2 -translate-x-1/2 p-4 bg-background rounded-md text-2xl font-semibold">
        {secondsToTime(timer)}
      </div>
      <div className="absolute z-10 top-4 left-0 p-2 pr-0 bg-background">
        <div className="absolute -z-10 top-0 bottom-0 left-0 -right-4 -skew-x-12 bg-background rounded-md" />
        <span className="text-slate-300 text-sm">Round</span>
        <br />
        <span className="text-2xl font-semibold">
          {game.round}/{MAX_ROUNDS}
        </span>
      </div>
      <div className="absolute z-10 top-4 right-0 p-2 pl-0 bg-background text-right">
        <div className="absolute -z-10 top-0 bottom-0 -left-4 right-0 skew-x-12 bg-background rounded-md" />
        <p className="text-slate-300 text-sm">Score</p>
        <UsersScore
          users={game?.users}
          className="mt-2 ml-2"
        />
      </div>
      <StreetMap skipOnInit />
      <SmallMap
        coordinates={game?.coordinates}
        answers={game?.answers}
        loading={loading}
        onClick={handleMapClick}
        onNext={handleNext}
      />
      <Dialog open={game?.is_final}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Final results</DialogTitle>
          </DialogHeader>
          <UsersScore users={game.users} />
          <DialogFooter>
            <Link
              to="/"
              className={buttonVariants({ variant: 'outline' })}
            >
              Home
            </Link>
            <Button
              variant="default"
              disabled
            >
              Play again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
