import { TextareaHTMLAttributes } from 'react'
import Label from '@/shared/ui/Label'
import ErrorMessage from '@/shared/ui/ErrorMessage'
import cn from 'classnames'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  description?: string
}

export default function Textarea({ label, error, description, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={label} />}
      {description && <p className="opacity-40 italic text-sm">{description}</p>}
      <textarea
        {...props}
        className={cn('border outline-none rounded-md p-2 max-h-[106px]', {
          'border-red-500 dark:border-red-500 outline-none': error,
          'border-gray-200   dark:border-white/10': !error,
        })}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
