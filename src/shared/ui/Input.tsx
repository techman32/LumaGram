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
        'bg-white border-gray-200 dark:bg-white/10 dark:border-white/10 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-1 border rounded-md py-1 px-2',
        { 'border-red-500 dark:border-red-500 outline-none': error },
        className,
      )}
    />
  )
}
