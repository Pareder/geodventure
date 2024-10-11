import { ReactNode } from 'react'
import cx from 'common/utils/classnames'
import { stringToColor } from 'common/utils/color'
import styles from './Avatar.module.css'

type AvatarProps = {
  size?: number
  text?: string | null
  className?: string
  children?: ReactNode
}

export default function Avatar({ size = 40, text, className, children }: AvatarProps) {
  return (
    <div
      className={cx(styles.avatar, className)}
      style={{ width: size, height: size, fontSize: size * 0.6, backgroundColor: stringToColor(text) }}
    >
      {children}
    </div>
  )
}
