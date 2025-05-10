import { LoaderCircle } from 'lucide-react'

export default function Loader() {
  return (
    <div className="h-dvh">
      <div className="flex justify-center items-center h-full">
        <LoaderCircle size={64} className="animate-spin text-gray-200 dark:text-white/20" />
      </div>
    </div>
  )
}
