import { ReactNode } from 'react'
import Button from '@/shared/ui/Button'
import { Compass, Heart, Send, SquarePlus } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b flex justify-between items-center border-gray-200 p-2 md:px-[10%] shadow-xs fixed w-full backdrop-blur-md bg-white/50 z-10">
        <h2 className="font-bold text-xl">Lumagram</h2>
        <div className="flex gap-2">
          <Button className="group">
            <Heart size={20} className="group-hover:scale-110 transition-[scale]" />
          </Button>
          <Button className="group">
            <Send size={20} className="group-hover:scale-110 transition-[scale]" />
          </Button>
          <Button className="group">
            <SquarePlus size={20} className="group-hover:scale-110 transition-[scale]" />
          </Button>
          <Button className="group">
            <Compass size={20} className="group-hover:scale-110 transition-[scale]" />
          </Button>
        </div>
      </div>
      <div className="pt-[53px]">
        {children}
      </div>
    </div>
  )
}
