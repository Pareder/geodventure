import cx from 'common/utils/classnames'
import Icon from 'common/components/Icon'
import styles from './Loader.module.css'

type LoaderProps = {
  size?: number
  isFullHeight?: boolean
}

export default function Loader({ size = 48, isFullHeight }: LoaderProps) {
  return (
    <div className={cx(styles.wrapper, isFullHeight && styles.fullHeight)}>
      <Icon
        name="loader"
        size={size}
        color="var(--color-blue-400)"
      />
    </div>
  )
}
