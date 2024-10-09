import { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  onClose?: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        {onClose && <span className={styles.close}>&times;</span>}
        {children}
      </div>
    </div>
  )
}
