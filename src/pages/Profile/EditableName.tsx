import { useEffect, useState } from 'react'
import { CheckIcon, Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { useAuth } from 'common/services/auth'
import { auth, firestore } from 'common/services/firebase'
import { Button } from 'common/ui/button'
import { Input } from 'common/ui/input'

type EditableNameProps = {
  defaultName?: string | null
}

export default function EditableName({ defaultName }: EditableNameProps) {
  const [name, setName] = useState(defaultName || '')
  const [isEdit, setEdit] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { setUser } = useAuth()

  const handleEdit = () => {
    setEdit(!isEdit)
    setName(defaultName || '')
  }

  const handleSave = () => {
    if (!name || !auth.currentUser) return

    setLoading(true)
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => setDoc(doc(firestore, 'users', auth.currentUser!.uid), { name }, { merge: true }))
      .then(() => {
        setUser({ ...auth.currentUser! })
        handleEdit()
        toast.success('Nickname updated')
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setName(defaultName || '')
  }, [defaultName])

  return (
    <div className="mb-2 flex items-center gap-1">
      {isEdit && (
        <>
          <Input
            type="text"
            value={name}
            placeholder="Nickname"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="link"
            size="icon"
            className="shrink-0"
            onClick={handleEdit}
          >
            <Cross2Icon className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={isLoading}
            className="shrink-0"
            onClick={handleSave}
          >
            <CheckIcon className="h-4 w-4 text-green-400" />
          </Button>
        </>
      )}
      {!isEdit && (
        <>
          <h3 className="text-xl mr-2">{name}</h3>
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
          >
            <Pencil1Icon className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
