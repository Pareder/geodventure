import { Outlet } from 'react-router-dom'
import Header from './Header'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
