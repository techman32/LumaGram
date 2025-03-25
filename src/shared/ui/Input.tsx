import { InputHTMLAttributes } from 'react'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'border border-gray-200 rounded-md px-2 py-1 w-full h-9 focus-visible:outline-black focus-visible:outline-1',
        className,
      )}
    />
  )
}
