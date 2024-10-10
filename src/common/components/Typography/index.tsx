import { ReactNode } from 'react'
import cx from 'common/utils/classnames'
import styles from './Typography.module.css'

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  color?: 'green' | 'blue' | 'red' | 'yellow' | 'grey' | 'inherit'
  margin?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  className?: string
  children: ReactNode
}

export default function Typography({
  variant,
  color = 'inherit',
  margin = 'none',
  className,
  children,
}: TypographyProps) {
  const Component = variant

  return <Component className={cx(styles.typography, styles[color], styles[margin], className)}>{children}</Component>
}
