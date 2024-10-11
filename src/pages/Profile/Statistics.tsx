import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuth } from 'common/services/auth'
import { firestore } from 'common/services/firebase'
import { GameType } from 'types'
import StatisticBlock from './StatisticBlock'
import { getStreak, getTotalScore } from './utils'
import styles from './Profile.module.css'

export default function Statistics() {
  const [games, setGames] = useState<GameType[]>([])
  const [isLoading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return

    getDocs(query(collection(firestore, 'games'), where('user', '==', user?.uid)))
      .then((snapshot) => {
        setGames(snapshot.docs.map((doc) => doc.data() as GameType))
      })
      .finally(() => setLoading(false))
  }, [user?.uid])

  return (
    <div className={styles.statistics}>
      <StatisticBlock
        isLoading={isLoading}
        label="Total Games"
        icon={
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 120 120"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fill="#FFC54D"
                d="M101,34l-0.2-1.7h-10c0.5-3.4,0.8-6.9,1-10.5c0.1-1.9-1.4-3.5-3.1-3.5H31.4c-1.8,0-3.2,1.6-3.1,3.5   c0.1,3.6,0.5,7.1,1,10.5h-10L19,34c-0.1,0.4-1.2,10.6,5.4,19.8c4.3,6,11,10.1,19.7,12.2c2.8,2.8,5.9,4.9,9.2,6.2   c-0.4,4.1-0.9,8.1-1.4,11.8h16.3c-0.6-3.8-1.1-7.7-1.5-11.8c3.3-1.2,6.4-3.3,9.2-6.2c8.7-2.1,15.4-6.2,19.7-12.2   C102.2,44.6,101,34.4,101,34z M27.3,51.3c-4.2-5.8-4.7-12.1-4.7-15.1h7.3c1.9,9.5,5.3,17.9,9.6,24.2C34.3,58.4,30.2,55.3,27.3,51.3   z M92.7,51.3c-2.9,4-7,7.1-12.2,9.1c4.4-6.4,7.7-14.7,9.6-24.2h7.3C97.4,39.2,96.8,45.5,92.7,51.3z"
              />

              <path
                fill="#C19D72"
                d="M77,98.1H43c-1,0-1.8-0.8-1.8-1.8V83.5c0-1,0.8-1.8,1.8-1.8h34c1,0,1.8,0.8,1.8,1.8v12.8   C78.8,97.3,78,98.1,77,98.1z"
              />

              <path
                fill="#A88763"
                d="M37.9,101.9h44.2c1,0,1.8-0.8,1.8-1.8v-3.8c0-1-0.8-1.8-1.8-1.8H37.9c-1,0-1.8,0.8-1.8,1.8v3.8   C36.1,101,36.9,101.9,37.9,101.9z"
              />

              <path
                fill="#FFC54D"
                d="M68,91H52c-0.7,0-1.2-0.5-1.2-1.2v-2.5c0-0.7,0.5-1.2,1.2-1.2h16c0.7,0,1.2,0.5,1.2,1.2v2.5   C69.2,90.5,68.6,91,68,91z"
              />
            </g>
          </svg>
        }
      >
        {games.length}
      </StatisticBlock>
      <StatisticBlock
        isLoading={isLoading}
        label="Total Points"
        icon={
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1,18.42L22.46,44.16a2,2,0,0,0,3.07,0L47,18.42H1Z"
              fill="#299acc"
            />
            <path
              d="M36.6,3.42H11.4A4,4,0,0,0,7.87,5.53L1,18.42H47L40.13,5.53A4,4,0,0,0,36.6,3.42Z"
              fill="#38b1e7"
            />
            <path
              d="M22.08,43.38L15,18.42H33l-7.08,25A2,2,0,0,1,22.08,43.38Z"
              fill="#61c0ea"
            />
            <polygon
              points="33 18.42 15 18.42 14 3.42 34 3.42 33 18.42"
              fill="#89d0ef"
            />
          </svg>
        }
      >
        {getTotalScore(games).toLocaleString()}
      </StatisticBlock>
      <StatisticBlock
        isLoading={isLoading}
        label="Day Streak"
        icon={
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <path
              fill="#F4900C"
              d="M35 19a16.96 16.96 0 0 0-1.04-5.868c-.46 5.389-3.333 8.157-6.335 6.868c-2.812-1.208-.917-5.917-.777-8.164c.236-3.809-.012-8.169-6.931-11.794c2.875 5.5.333 8.917-2.333 9.125c-2.958.231-5.667-2.542-4.667-7.042c-3.238 2.386-3.332 6.402-2.333 9c1.042 2.708-.042 4.958-2.583 5.208c-2.84.28-4.418-3.041-2.963-8.333A16.936 16.936 0 0 0 1 19c0 9.389 7.611 17 17 17s17-7.611 17-17z"
            />
            <path
              fill="#FFCC4D"
              d="M28.394 23.999c.148 3.084-2.561 4.293-4.019 3.709c-2.106-.843-1.541-2.291-2.083-5.291s-2.625-5.083-5.708-6c2.25 6.333-1.247 8.667-3.08 9.084c-1.872.426-3.753-.001-3.968-4.007A11.964 11.964 0 0 0 6 30c0 .368.023.73.055 1.09C9.125 34.124 13.342 36 18 36s8.875-1.876 11.945-4.91c.032-.36.055-.722.055-1.09c0-2.187-.584-4.236-1.606-6.001z"
            />
          </svg>
        }
      >
        {getStreak(games)}
      </StatisticBlock>
    </div>
  )
}
