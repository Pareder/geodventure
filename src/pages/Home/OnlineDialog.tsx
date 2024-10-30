import { useNavigate } from 'react-router-dom'

import { Button } from 'common/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from 'common/ui/dialog'
import { getRandomString } from 'common/utils/randomHelpers'

import JoinForm from './JoinForm'

export default function OnlineDialog() {
  const navigate = useNavigate()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
        >
          Online
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Play Online</DialogTitle>
          <DialogDescription>You can create a new game or join an existing one.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Button
            type="button"
            className="w-full"
            onClick={() => navigate(`/online/${getRandomString(6)}`)}
          >
            Create a room
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
        </div>
        <JoinForm />
      </DialogContent>
    </Dialog>
  )
}
