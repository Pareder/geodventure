import { Avatar, AvatarFallback } from 'common/ui/avatar'
import cx from 'common/utils/classnames'

import { GameMessage } from '../../../global'

type UsersScoreProps = {
  className?: string
  users: GameMessage['users']
}

export default function UsersScore({ className, users }: UsersScoreProps) {
  const maxScoreIndex = users?.reduce((res, user, index) => (user.score > users[res].score ? index : res), 0)

  return users.map(({ id, name, score }, index) => (
    <div
      key={id}
      className={cx(
        'p-2 flex items-center gap-4 rounded-md',
        index === maxScoreIndex ? 'bg-green-950' : 'bg-red-950',
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
