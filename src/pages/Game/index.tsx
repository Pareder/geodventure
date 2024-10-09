import { useEffect, useRef, useState } from 'react'
import Button from 'common/components/Button'
import Modal from 'common/components/Modal'
import StreetMap from 'common/components/StreetMap'
import { setStreetView } from 'common/components/StreetMap/utils'
import { secondsToTime } from 'common/utils/time'
import { MAX_ROUNDS, TIME } from './consts'
import { calculateScore, saveScore } from './utils'
import SmallMap from './SmallMap'
import styles from './Game.module.css'

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
      <div className={styles.time}>{secondsToTime(timer)}</div>
      <div className={styles.round}>
        Round
        <br />
        <span className={styles.textBig}>
          {round}/{MAX_ROUNDS}
        </span>
      </div>
      <div className={styles.score}>
        Score
        <br />
        <span className={styles.textBig}>{score}</span>
      </div>
      <StreetMap setCoordinates={setCoordinates} />
      <SmallMap
        key={round}
        coordinates={coordinates}
        onClick={handleClick}
      />
      {isFinal && (
        <Modal>
          <h2 className={styles.finalTitle}>Your final score is: {score}</h2>
          <div className={styles.buttons}>
            <Button onClick={restart}>Play again</Button>
            <Button
              to="/"
              variant="secondary"
            >
              Home
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
