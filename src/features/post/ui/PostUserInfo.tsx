import Photo from '@/shared/ui/Photo'
import { Image } from '@/shared/common/types/image'

type PostUserInfoProps = {
  username: string
  image: Image
}

export default function PostUserInfo({ username, image }: PostUserInfoProps) {
  return (
    <div className="flex gap-4 items-center">
      <Photo src={`http://localhost:8000/${image.url}`} size={32} />
      <p>{username}</p>
    </div>
  )
}
