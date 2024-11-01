import { Avatar, AvatarFallback } from 'common/ui/avatar'

import { GameMessage } from '../../../global'

type UsersScoreProps = {
  users: GameMessage['users']
}

export default function UsersScore({ users }: UsersScoreProps) {
  return users.map(({ id, name, score }) => (
    <div
      key={id}
      className="mt-2 ml-2 p-2 flex items-center gap-4 rounded-md bg-secondary"
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
