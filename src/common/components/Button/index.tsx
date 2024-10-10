import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import cx from 'common/utils/classnames'
import styles from './Button.module.css'

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never
}

type LinkElementProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  to: string
}

export type ButtonProps = (ButtonElementProps | LinkElementProps) & {
  variant?: 'primary' | 'secondary'
  size?: 'medium' | 'small'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth,
  to,
  className,
  ...props
}: ButtonProps) {
  const classNames = cx(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className)

  if (to) {
    return (
      <Link
        {...(props as LinkElementProps)}
        to={to}
        className={classNames}
      />
    )
  }

  return (
    <button
      {...(props as ButtonElementProps)}
      className={classNames}
    />
  )
}
