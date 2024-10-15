import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="h-screen relative flex items-center justify-center lg:p-8 bg-background">
      <div className="sm:w-[350px] flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
