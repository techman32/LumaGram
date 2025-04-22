import { Heart, MessageCircle } from 'lucide-react'

export default function Post() {
  return (
    <div className="flex flex-col items-center gap-4 border-b sm:border-none border-gray-200 dark:border-white/10 pb-2 sm:pb-0">
      <div className="group relative w-full aspect-square bg-gray-300 dark:bg-black/80 flex items-center justify-center rounded-sm">
        <p className="hidden sm:flex absolute opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 text-black dark:text-white font-bold flex-col gap-2">
          <span className="flex gap-2 items-center">
            <Heart size={20} />
            <span>17</span>
          </span>
          <span className="flex gap-2 items-center">
            <MessageCircle size={20} />
            <span>17</span>
          </span>
        </p>
      </div>
      <div className="block sm:hidden">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <Heart size={20} />
            <span>17</span>
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircle size={20} />
            <span>17</span>
          </div>
        </div>
      </div>
    </div>
  )
}
