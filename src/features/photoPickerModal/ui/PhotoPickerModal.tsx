'use client'
import { ChangeEvent, useState, useEffect, useCallback, ReactNode } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedImage } from '@/shared/common/lib/getCroppedImage'
import PhotoPickerFooter from '@/features/photoPickerModal/ui/PhotoPickerFooter'
import PhotoPickerDropzone from '@/features/photoPickerModal/ui/PhotoPickerDropzone'

type PhotoPickerModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  onSelectAction: (file: File) => void
  title?: string
  children?: ReactNode
}

export default function PhotoPickerModal({
  isOpen,
  onCloseAction,
  onSelectAction,
  title,
  children,
}: PhotoPickerModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setPreviewUrl(null)
      setFile(null)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseAction()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCloseAction])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setPreviewUrl(URL.createObjectURL(f))
    }
  }

  const onCropComplete = useCallback((_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea)
  }, [])

  const handleConfirm = async () => {
    if (!file || !previewUrl || !croppedAreaPixels) return
    const cropped = await getCroppedImage(previewUrl, croppedAreaPixels, file)
    if (cropped) {
      onSelectAction(cropped)
      onCloseAction()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={() => {
        if (!previewUrl) onCloseAction()
        else return
      }}
    >
      <div
        className="bg-white dark:bg-black/20 dark:border dark:border-white/20 p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{title || 'Выберите фотографию'}</h2>

        <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-black/40">
          {previewUrl ? (
            <Cropper
              image={previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <PhotoPickerDropzone onChangeAction={handleFileChange} />
          )}
        </div>

        {previewUrl && (
          <PhotoPickerFooter
            zoom={zoom}
            setZoom={setZoom}
            onCloseAction={onCloseAction}
            onSubmitAction={handleConfirm}
            children={children}
          />
        )}
      </div>
    </div>
  )
}
