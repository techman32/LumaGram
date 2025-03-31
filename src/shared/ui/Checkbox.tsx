import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export default function Checkbox({ label, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" id={id} className="hidden peer" {...props} />
      <span className="w-4 h-4 border border-gray-300 rounded-sm block p-1 peer-checked:bg-black">
      </span>
      <span>{label}</span>
    </label>
  )
}
