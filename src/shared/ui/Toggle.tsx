import { ChangeEvent, InputHTMLAttributes } from 'react'

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Toggle({ label, checked = false, onChange, ...props }: ToggleProps) {
  return (
    <label className="relative inline-block w-14 h-8 cursor-pointer">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} {...props} />
      <span
        className={`block w-full h-full rounded-full transition-colors duration-300 ${
          checked ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-white/10'
        }`}
      ></span>
      <span
        className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-6' : ''
        }`}
      ></span>
    </label>
  )
}
