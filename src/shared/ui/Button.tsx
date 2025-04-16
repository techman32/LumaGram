import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  appearance?: 'primary' | 'secondary' | 'default' | 'ghost' | 'dropdown'
  block?: boolean
}

export default function Button({ className, appearance = 'default', block, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer relative p-2 rounded-md transition-colors duration-300 outline-none focus:outline-none',
        {
          'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-medium':
            appearance === 'primary',
          'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20': appearance === 'secondary',
          'hover:bg-gray-100 dark:hover:bg-white/10': appearance === 'ghost',
          'border border-gray-200 hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/10':
            appearance === 'dropdown',
        },
        { 'w-full': block },
        { 'w-full text-left': block && appearance === 'dropdown' },
        className,
      )}
    />
  )
}
