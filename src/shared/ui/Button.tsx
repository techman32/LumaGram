import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  appearance?: 'primary' | 'secondary' | 'default'
  block?: boolean
}

export default function Button({ className, appearance = 'default', block, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer px-2 py-1 rounded-md transition-colors h-9',
        { 'bg-black text-white hover:bg-black/85 font-medium dark:bg-white dark:text-black dark:hover:bg-white/90': appearance === 'primary' },
        { 'bg-gray-100 hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-black/50': appearance === 'secondary' },
        { 'w-full': block },
        className,
      )}
    />
  )
}
