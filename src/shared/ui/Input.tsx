import { InputHTMLAttributes } from 'react'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean
}

export default function Input({ className = '', error = false, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'border border-gray-200 rounded-md px-2 py-1 w-full h-9 focus-visible:outline-black dark:focus-visible:outline-white dark:text-white focus-visible:outline-1',
        { 'border-red-500 outline-none': error },
        className,
      )}
    />
  )
}
