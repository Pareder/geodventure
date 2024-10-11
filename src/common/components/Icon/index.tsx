import { ComponentProps, FunctionComponent } from 'react'
import CheckIcon from './icons/check.svg?react'
import CloseIcon from './icons/close.svg?react'
import DiamondIcon from './icons/diamond.svg?react'
import DiamondsIcon from './icons/diamonds.svg?react'
import EditIcon from './icons/edit.svg?react'
import FireIcon from './icons/fire.svg?react'
import GoogleIcon from './icons/google.svg?react'
import LoaderIcon from './icons/loader.svg?react'
import LogoutIcon from './icons/logout.svg?react'
import TrophyIcon from './icons/trophy.svg?react'
import UserIcon from './icons/user.svg?react'

type IconName =
  | 'check'
  | 'close'
  | 'diamond'
  | 'diamonds'
  | 'edit'
  | 'fire'
  | 'google'
  | 'loader'
  | 'logout'
  | 'trophy'
  | 'user'

type IconProps = {
  name: IconName
  size?: number
  color?: string
}

const iconMap: Record<IconName, FunctionComponent<ComponentProps<'svg'>>> = {
  check: CheckIcon,
  close: CloseIcon,
  diamond: DiamondIcon,
  diamonds: DiamondsIcon,
  edit: EditIcon,
  fire: FireIcon,
  google: GoogleIcon,
  loader: LoaderIcon,
  logout: LogoutIcon,
  trophy: TrophyIcon,
  user: UserIcon,
}

export default function Icon({ name, size, color }: IconProps) {
  const IconComponent = iconMap[name]
  return <IconComponent style={{ width: size, height: size, color }} />
}
