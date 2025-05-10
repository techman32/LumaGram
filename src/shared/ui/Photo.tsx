import Image from 'next/image'
import { Camera } from 'lucide-react'

type PhotoProps = {
  size?: number
  src?: string
}

export default function Photo({ size = 128, src }: PhotoProps) {
  return (
    <div
      className="bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden flex justify-center items-center"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt="Фотография профиля"
          width={size}
          height={size}
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <Camera className="text-gray-400 dark:text-black/60" size={size / 2} />
      )}
    </div>
  )
}
