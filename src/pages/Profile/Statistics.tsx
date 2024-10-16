import { GameType } from 'types'
import Icon from 'common/components/Icon'

import StatisticBlock from './StatisticBlock'
import { getStreak, getTotalScore } from './utils'

type StatisticsProps = {
  games: GameType[]
  isLoading: boolean
}

export default function Statistics({ games, isLoading }: StatisticsProps) {
  const gamesCount = games.length
  const totalScore = getTotalScore(games)

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      <StatisticBlock
        isLoading={isLoading}
        label="Total Games"
        icon={
          <Icon
            name="trophy"
            size={32}
          />
        }
      >
        {gamesCount}
      </StatisticBlock>
      <StatisticBlock
        isLoading={isLoading}
        label="Total Points"
        icon={
          <Icon
            name="diamond"
            size={32}
          />
        }
      >
        {totalScore.toLocaleString()}
      </StatisticBlock>
      <StatisticBlock
        isLoading={isLoading}
        label="Average Score"
        icon={
          <Icon
            name="diamonds"
            size={32}
          />
        }
      >
        {(totalScore / gamesCount).toLocaleString()}
      </StatisticBlock>
      <StatisticBlock
        isLoading={isLoading}
        label="Day Streak"
        icon={
          <Icon
            name="fire"
            size={32}
          />
        }
      >
        {getStreak(games)}
      </StatisticBlock>
    </div>
  )
}
