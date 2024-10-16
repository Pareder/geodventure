import { ComponentProps, FunctionComponent } from 'react'
import DiamondIcon from './icons/diamond.svg?react'
import DiamondsIcon from './icons/diamonds.svg?react'
import FireIcon from './icons/fire.svg?react'
import GoogleIcon from './icons/google.svg?react'
import TrophyIcon from './icons/trophy.svg?react'

type IconName = 'diamond' | 'diamonds' | 'fire' | 'google' | 'trophy'

type IconProps = ComponentProps<'svg'> & {
  name: IconName
  size?: number
  color?: string
}

const iconMap: Record<IconName, FunctionComponent<ComponentProps<'svg'>>> = {
  diamond: DiamondIcon,
  diamonds: DiamondsIcon,
  fire: FireIcon,
  google: GoogleIcon,
  trophy: TrophyIcon,
}

export default function Icon({ name, size, color, ...props }: IconProps) {
  const IconComponent = iconMap[name]
  return (
    <IconComponent
      style={{ width: size, height: size, color }}
      {...props}
    />
  )
}
