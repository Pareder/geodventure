import { ReactNode } from 'react'
import cx from 'common/utils/classnames'
import styles from './Alert.module.css'

type AlertProps = {
  severity: 'success' | 'error'
  className?: string
  children: ReactNode
}

export default function Alert({ severity, className, children }: AlertProps) {
  return <div className={cx(styles.alert, styles[severity], className)}>{children}</div>
}
