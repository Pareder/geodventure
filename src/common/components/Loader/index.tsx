import cx from 'common/utils/classnames'
import { LoadingSpinner } from './LoadingSpinner'

export { LoadingSpinner }

type LoaderProps = {
  size?: number
  isFullHeight?: boolean
}

export default function Loader({ size = 48, isFullHeight }: LoaderProps) {
  return (
    <div className={cx('flex flex-col items-center justify-center', { 'h-screen': isFullHeight })}>
      <LoadingSpinner size={size} />
    </div>
  )
}
