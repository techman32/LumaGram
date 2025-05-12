import { Heart, MessageCircle } from 'lucide-react'
import { PostDto } from '@/shared/common/types/posts'

export default function Post({ post, onClick }: { post: PostDto; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative group aspect-square bg-gray-100 rounded overflow-hidden flex items-center justify-center cursor-pointer"
    >
      <img
        src={`http://localhost:8000/${post.image.url}`}
        alt={post.description}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 text-white flex justify-center items-center transition-all duration-300">
        <div className="flex flex-col gap-2">
          <span className="flex gap-2 items-center">
            <Heart size={20} />
            <span>{post.likeCount}</span>
          </span>
          <span className="flex gap-2 items-center">
            <MessageCircle size={20} />
            <span>{post.commentCount}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
