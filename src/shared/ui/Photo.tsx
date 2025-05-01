import Image from 'next/image'
import { Camera } from 'lucide-react'

type PhotoProps = {
  size?: number
  src?: string
}

export default function Photo({ size, src }: PhotoProps) {
  return (
    <div className="bg-gray-200 rounded-full flex justify-center items-center" style={{ width: size, height: size }}>
      {src ? (
        <Image width={size} height={size} src={src} alt="Фотография профиля" />
      ) : (
        <Camera className="text-gray-400" size={size ? size / 2 : size} />
      )}
    </div>
  )
}
