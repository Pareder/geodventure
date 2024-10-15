import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import StreetMap from 'common/components/StreetMap'
import { setStreetView } from 'common/components/StreetMap/utils'
import { Button, buttonVariants } from 'common/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'common/ui/dialog'
import { secondsToTime } from 'common/utils/time'
import { MAX_ROUNDS, TIME } from './consts'
import { calculateScore, saveScore } from './utils'
import SmallMap from './SmallMap'

export default function Game() {
  const [round, setRound] = useState(1)
  const [timer, setTimer] = useState(TIME)
  const [score, setScore] = useState(0)
  const [isFinal, setFinal] = useState(false)
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>()
  const timerInterval = useRef<NodeJS.Timeout>()
  const pauseTimeout = useRef<NodeJS.Timeout>()

  const increaseRound = (newScore?: number) => {
    setRound((round) => {
      if (round === MAX_ROUNDS) {
        setFinal(true)
        saveScore(newScore || score)
        return round
      }

      setStreetView(setCoordinates)
      return round + 1
    })
  }

  const handleClick = (distance: number) => {
    const newScore = score + calculateScore(distance)
    setScore(newScore)
    clearInterval(timerInterval.current)
    pauseTimeout.current = setTimeout(() => {
      increaseRound(newScore)
      setTimer(TIME)
    }, 3000)
  }

  const restart = () => {
    setFinal(false)
    setRound(1)
    setTimer(TIME)
    setScore(0)
    setStreetView(setCoordinates)
  }

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimer((timer) => {
        if (timer === 0) {
          increaseRound()
          return TIME
        }

        return timer - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerInterval.current)
      clearTimeout(pauseTimeout.current)
    }
  }, [round])

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
          {round}/{MAX_ROUNDS}
        </span>
      </div>
      <div className="absolute z-10 top-4 right-0 p-2 pl-0 bg-background text-right">
        <div className="absolute -z-10 top-0 bottom-0 -left-4 right-0 skew-x-12 bg-background rounded-md" />
        <span className="text-slate-300 text-sm">Score</span>
        <br />
        <span className="text-2xl font-semibold">{score}</span>
      </div>
      <StreetMap setCoordinates={setCoordinates} />
      <SmallMap
        key={round}
        coordinates={coordinates}
        onClick={handleClick}
      />
      <Dialog open={isFinal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your final score is: {score}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Link
              to="/"
              className={buttonVariants({ variant: 'outline' })}
            >
              Home
            </Link>
            <Button
              variant="default"
              onClick={restart}
            >
              Play again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
