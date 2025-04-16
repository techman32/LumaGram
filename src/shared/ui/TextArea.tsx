import { TextareaHTMLAttributes } from 'react'
import cn from 'classnames'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  error?: boolean
  block?: boolean
}

export default function TextArea({ className = '', error = false, block = false, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-[80px] bg-white border-gray-200 dark:bg-white/10 dark:border-white/10 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-1 border rounded-md py-1 px-2',
        { 'border-red-500 dark:border-red-500 outline-none': error },
        { 'w-full': block },
        className,
      )}
    />
  )
}
