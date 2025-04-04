import { Heart, MessageCircle } from 'lucide-react'

export default function Post() {
  return (
    <div className="flex flex-col items-center">
      <div className="group relative w-full aspect-square bg-gray-300 flex items-center justify-center">
        <p className="absolute opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 text-black font-bold flex flex-col gap-2">
          <span className="flex gap-2 items-center">
            <Heart size={20} /> 100
          </span>
          <span className="flex gap-2 items-center">
            <MessageCircle size={20} /> 10
          </span>
        </p>
      </div>
    </div>
  )
}
