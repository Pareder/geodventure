import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import cx from 'common/utils/classnames'
import { stringToHslColor } from 'common/utils/color'
import { getInitials } from 'common/utils/user'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cx('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cx('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  text?: string | null
}

const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ className, text, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cx('flex h-full w-full items-center justify-center rounded-full bg-muted font-semibold', className)}
      style={{ backgroundColor: stringToHslColor(text) }}
      {...props}
    >
      {getInitials(text || '')}
    </AvatarPrimitive.Fallback>
  ),
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
