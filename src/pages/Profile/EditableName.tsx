import { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import Button from 'common/components/Button'
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
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="var(--color-grey-400)"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
              />
            </svg>
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={isLoading}
            onClick={handleSave}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="var(--color-green-400)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 5L8 15l-5-4"
              />
            </svg>
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
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="var(--color-blue-300)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"
              />
            </svg>
          </Button>
        </>
      )}
    </div>
  )
}
