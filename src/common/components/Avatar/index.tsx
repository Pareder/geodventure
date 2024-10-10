import { ReactNode } from 'react'
import cx from 'common/utils/classnames'
import styles from './Avatar.module.css'

type AvatarProps = {
  size?: number
  className?: string
  children?: ReactNode
}

export default function Avatar({ size = 40, className, children }: AvatarProps) {
  return (
    <div
      className={cx(styles.avatar, className)}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  )
}
