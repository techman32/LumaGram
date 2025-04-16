import { ChevronDown } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'
import Button from '@/shared/ui/Button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean
}

export default function ButtonDropdown({ block = false, ...props }: ButtonProps) {
  return (
    <>
      <Button className="group py-1" appearance="dropdown" {...props} block={block} />
      <ChevronDown size={20} className="absolute top-0 bottom-0 right-2 my-auto text-gray-400" />
    </>
  )
}
