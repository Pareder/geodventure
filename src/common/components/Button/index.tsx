import { ButtonHTMLAttributes } from 'react'
import cx from 'common/utils/classnames'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
}

export default function Button({ fullWidth, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(styles.button, fullWidth && styles.fullWidth, className)}
    />
  )
}
