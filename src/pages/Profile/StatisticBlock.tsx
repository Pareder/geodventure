import { ReactNode } from 'react'

import Loader from 'common/components/Loader'

type StatisticBlockProps = {
  isLoading?: boolean
  label: ReactNode
  icon?: ReactNode
  children: ReactNode
}

export default function StatisticBlock({ isLoading, label, icon, children }: StatisticBlockProps) {
  return (
    <div className="p-2 flex items-center gap-4 border rounded-md">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {icon}
          <div>
            <h3 className="text-xl font-semibold">{children}</h3>
            <p className="text-slate-300">{label}</p>
          </div>
        </>
      )}
    </div>
  )
}
