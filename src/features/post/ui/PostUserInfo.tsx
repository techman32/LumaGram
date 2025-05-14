import Photo from '@/shared/ui/Photo'
import { Image } from '@/shared/common/types/image'

type PostUserInfoProps = {
  username: string
  image: Image
}

export default function PostUserInfo({ username, image }: PostUserInfoProps) {
  return (
    <div className="flex gap-2 items-center p-2 border-b border-gray-200 dark:border-white/20">
      <Photo src={image ? `http://localhost:8000/${image.url}` : ''} size={40} />
      <p className="font-semibold">{username}</p>
    </div>
  )
}
