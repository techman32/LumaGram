import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'scalable' | 'ghost' | 'primary' | 'secondary'
  size?: 'small' | 'medium'
  block?: boolean
}

export default function Button({ appearance = 'ghost', size = 'medium', block = false, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'cursor-pointer p-1 rounded-md transition-colors duration-300 text-center',
        {
          'hover:scale-110': appearance === 'scalable',
          'hover:bg-gray-200 dark:hover:bg-white/10': appearance === 'ghost',
          'bg-black text-white hover:bg-black/80 py-2 dark:bg-white dark:text-black dark:hover:bg-gray-200':
            appearance === 'primary',
          'border border-gray-200 hover:bg-gray-100 dark:border-white/20 dark:hover:bg-white/20 px-2':
            appearance === 'secondary',
        },
        {
          'text-sm': size === 'small',
          'text-base': size === 'medium',
        },
        {
          'w-full': block,
        },
      )}
      {...props}
    />
  )
}
