import { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import Button from 'common/components/Button'
import Icon from 'common/components/Icon'
import Input from 'common/components/Input'
import Typography from 'common/components/Typography'
import { useAuth } from 'common/services/auth'
import { auth, firestore } from 'common/services/firebase'
import styles from './Profile.module.css'

type EditableNameProps = {
  defaultName?: string | null
}

export default function EditableName({ defaultName }: EditableNameProps) {
  const [name, setName] = useState(defaultName || '')
  const [isEdit, setEdit] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
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
        enqueueSnackbar('Nickname updated', { variant: 'success' })
      })
      .catch(() => enqueueSnackbar('Something went wrong', { variant: 'error' }))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setName(defaultName || '')
  }, [defaultName])

  return (
    <div className={styles.editWrapper}>
      {isEdit && (
        <>
          <Input
            size="small"
            type="text"
            value={name}
            placeholder="Nickname"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="text"
            size="small"
            onClick={handleEdit}
          >
            <Icon
              name="close"
              size={20}
              color="var(--color-grey-400)"
            />
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={isLoading}
            onClick={handleSave}
          >
            <Icon
              name="check"
              size={20}
              color="var(--color-green-400)"
            />
          </Button>
        </>
      )}
      {!isEdit && (
        <>
          <Typography variant="h3">{name}</Typography>
          <Button
            variant="text"
            size="small"
            onClick={handleEdit}
          >
            <Icon
              name="edit"
              size={20}
              color="var(--color-blue-300)"
            />
          </Button>
        </>
      )}
    </div>
  )
}
