import Button from '@/shared/ui/Button'
import { Settings } from 'lucide-react'

export default function ButtonSettings() {
  return (
    <Button className="transition-transform duration-500 ease-in-out lg:hover:rotate-90">
      <Settings size={20} />
    </Button>
  )
}
