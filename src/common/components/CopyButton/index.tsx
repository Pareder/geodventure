import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'

import { Button, ButtonProps } from 'common/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'common/ui/tooltip'

type CopyButtonProps = Omit<ButtonProps, 'children' | 'onClick'> & {
  text: string
}

export default function CopyButton({ text, ...props }: CopyButtonProps) {
  const [isCopied, setCopied] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout>()

  const handleClick = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip open={isCopied}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            onClick={handleClick}
          >
            {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copied</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
