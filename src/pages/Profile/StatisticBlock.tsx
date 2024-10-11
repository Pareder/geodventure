import { ReactNode } from 'react'
import Loader from 'common/components/Loader'
import Typography from 'common/components/Typography'
import styles from './Profile.module.css'

type StatisticBlockProps = {
  isLoading?: boolean
  label: ReactNode
  icon?: ReactNode
  children: ReactNode
}

export default function StatisticBlock({ isLoading, label, icon, children }: StatisticBlockProps) {
  return (
    <div className={styles.block}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
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
        </>
      )}
    </div>
  )
}
