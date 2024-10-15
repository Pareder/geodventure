import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="relative grow overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
