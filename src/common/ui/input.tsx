import * as React from 'react'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import { Button } from 'common/ui/button'
import cx from 'common/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cx(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const disabled = props.value === '' || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeOpenIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        ) : (
          <EyeNoneIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { Input, PasswordInput }
