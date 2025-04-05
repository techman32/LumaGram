import Button from '@/shared/ui/Button'
import { Compass, Heart, Send, SquarePlus } from 'lucide-react'

export default function Header() {
  return (
    <div className="bg-white/20 backdrop-blur-md border-gray-200 dark:bg-black/20 dark:border-white/10 border-b py-2 px-4 md:px-0 fixed w-full shadow-xs z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="font-bold text-xl dark:text-white">Lumagram</h2>
        <div className="flex gap-2">
          <Button className="group">
            <Heart size={20} className="group-hover:scale-110 transition-[scale] dark:stroke-white" />
          </Button>
          <Button className="group">
            <Send size={20} className="group-hover:scale-110 transition-[scale] dark:stroke-white" />
          </Button>
          <Button className="group">
            <SquarePlus size={20} className="group-hover:scale-110 transition-[scale] dark:stroke-white" />
          </Button>
          <Button className="group">
            <Compass size={20} className="group-hover:scale-110 transition-[scale] dark:stroke-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
