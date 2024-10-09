import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import cx from 'common/utils/classnames'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never
}

type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  to: string
}

type Props = (ButtonProps | LinkProps) & {
  variant?: 'primary' | 'secondary'
  size?: 'medium' | 'small'
  fullWidth?: boolean
}

export default function Button({ variant = 'primary', size = 'medium', fullWidth, to, className, ...props }: Props) {
  const classNames = cx(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className)

  if (to) {
    return (
      <Link
        {...(props as LinkProps)}
        to={to}
        className={classNames}
      />
    )
  }

  return (
    <button
      {...(props as ButtonProps)}
      className={classNames}
    />
  )
}
