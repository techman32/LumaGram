import { InputHTMLAttributes } from 'react'
import Label from '@/shared/ui/Label'
import ErrorMessage from '@/shared/ui/ErrorMessage'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  block?: boolean
  error?: string
  description?: string
}

export default function Input({ label, block, error, description, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={label} />}
      {description && <p className="opacity-40 italic text-sm">{description}</p>}
      <input
        className={cn(
          'p-2 outline-none border rounded-md',
          {
            'border-red-500 dark:border-red-500 outline-none': error,
            'border-gray-200   dark:border-white/10': !error,
          },
          { 'w-full': block },
        )}
        {...props}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
