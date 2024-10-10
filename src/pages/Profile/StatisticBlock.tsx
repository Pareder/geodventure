import { ReactNode } from 'react'
import Typography from 'common/components/Typography'
import styles from './Profile.module.css'

type StatisticBlockProps = {
  label: ReactNode
  icon?: ReactNode
  children: ReactNode
}

export default function StatisticBlock({ label, icon, children }: StatisticBlockProps) {
  return (
    <div className={styles.block}>
      <div className={styles.blockIcon}>{icon}</div>
      <div>
        <Typography variant="h3">{children}</Typography>
        <Typography
          variant="p"
          color="grey"
        >
          {label}
        </Typography>
      </div>
    </div>
  )
}
