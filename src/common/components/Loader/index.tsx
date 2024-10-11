import cx from 'common/utils/classnames'
import styles from './Loader.module.css'

type LoaderProps = {
  size?: number
  isFullHeight?: boolean
}

export default function Loader({ size = 48, isFullHeight }: LoaderProps) {
  return (
    <div className={cx(styles.wrapper, isFullHeight && styles.fullHeight)}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}
