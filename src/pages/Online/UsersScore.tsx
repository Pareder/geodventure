import { Avatar, AvatarFallback } from 'common/ui/avatar'
import cx from 'common/utils/classnames'

import { GameMessage } from '../../../global'

type UsersScoreProps = {
  className?: string
  users: GameMessage['users']
}

export default function UsersScore({ className, users }: UsersScoreProps) {
  const maxScore = users?.reduce((res, user) => (user.score > res ? user.score : res), 0)
  const maxScoreOccurrences = users?.filter((user) => user.score === maxScore).length

  return users.map(({ id, name, score }) => (
    <div
      key={id}
      className={cx(
        'p-2 flex items-center gap-4 rounded-md bg-secondary',
        maxScoreOccurrences === 1 ? (score === maxScore ? 'bg-green-950' : 'bg-red-950') : '',
        className,
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="h-6 w-6">
          <AvatarFallback
            className="text-xs bg-background"
            text={name}
          />
        </Avatar>
        <p className="font-semibold text-ellipsis overflow-hidden">{name}</p>
      </div>
      <p className="ml-auto shrink-0 font-semibold">{score.toLocaleString()} pts</p>
    </div>
  ))
}
