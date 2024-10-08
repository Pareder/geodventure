import { InputHTMLAttributes, ReactNode } from 'react'
import cx from 'common/utils/classnames'
import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
}

export default function Input({ label, id, className, ...props }: InputProps) {
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
        className={cx(styles.input, className)}
        {...props}
      />
    </div>
  )
}
