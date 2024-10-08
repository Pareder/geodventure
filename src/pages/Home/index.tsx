import { useEffect, useRef, useState } from 'react'
import { APIProvider } from '@vis.gl/react-google-maps'
import { secondsToTime } from 'common/utils/time'
import { TIME } from './consts'
import { calculateScore, setStreetView } from './utils'
import SmallMap from './SmallMap'
import styles from './Home.module.css'

export default function Home() {
  const [round, setRound] = useState(1)
  const [timer, setTimer] = useState(TIME)
  const [score, setScore] = useState(0)
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>()
  const timerInterval = useRef<NodeJS.Timeout>()
  const pauseTimeout = useRef<NodeJS.Timeout>()

  const handleClick = (distance: number) => {
    setScore((score) => score + calculateScore(distance))
    clearInterval(timerInterval.current)
    pauseTimeout.current = setTimeout(() => {
      setStreetView(setCoordinates)
      setRound((round) => round + 1)
      setTimer(TIME)
    }, 3000)
  }

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimer((timer) => {
        if (timer === 0) {
          setStreetView(setCoordinates)
          setRound((round) => round + 1)
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
    <APIProvider
      apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
      onLoad={() => setStreetView(setCoordinates)}
    >
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <span className={styles.round}>Round {round}</span>
          <br />
          <span className={styles.time}>{secondsToTime(timer)}</span>
          <br />
          <span className={styles.score}>Score: {score}</span>
        </div>
        <div
          id="street-map"
          className={styles.mainMap}
        />
        <SmallMap
          key={round}
          coordinates={coordinates}
          onClick={handleClick}
        />
      </div>
    </APIProvider>
  )
}
