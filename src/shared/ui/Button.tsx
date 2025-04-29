import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'scalable' | 'ghost'
  size?: 'small' | 'medium' | 'large'
}

export default function Button({ appearance = 'ghost', size = 'medium', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'cursor-pointer text-base p-1 rounded-md transition-colors duration-300',
        {
          'hover:scale-110': appearance === 'scalable',
          'hover:bg-gray-200 dark:hover:bg-white/10': appearance === 'ghost',
        },
        {
          'text-sm': size === 'small',
          'text-lg': size === 'large',
        },
      )}
      {...props}
    />
  )
}
