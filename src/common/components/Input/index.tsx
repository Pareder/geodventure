import { InputHTMLAttributes, ReactNode } from 'react'
import cx from 'common/utils/classnames'
import styles from './Input.module.css'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode
  size?: 'medium' | 'small'
}

export default function Input({ label, size = 'medium', id, className, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cx(styles.input, styles[size], className)}
        {...props}
      />
    </div>
  )
}
