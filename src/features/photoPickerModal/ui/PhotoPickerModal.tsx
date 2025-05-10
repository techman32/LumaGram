'use client'
import Input from '@/shared/ui/Input'
import { ChangeEvent, useState, useEffect, useCallback, ReactNode } from 'react'
import Button from '@/shared/ui/Button'
import { CloudUpload } from 'lucide-react'
import Cropper, { Area } from 'react-easy-crop'

interface PhotoPickerModalProps {
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

  const getCroppedImage = async () => {
    if (!file || !previewUrl || !croppedAreaPixels) return

    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image()
        image.src = url
        image.onload = () => resolve(image)
        image.onerror = reject
      })

    const image = await createImage(previewUrl)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    )

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return
        const croppedFile = new File([blob], file.name, { type: file.type })
        resolve(croppedFile)
      }, file.type)
    })
  }

  const handleConfirm = async () => {
    const cropped = await getCroppedImage()
    if (cropped) {
      onSelectAction(cropped)
      onCloseAction()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onCloseAction}
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
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 dark:border-white/20 cursor-pointer transition-colors duration-300"
            >
              <CloudUpload size={32} className="text-gray-500 dark:text-white/80" />
              <p className="mb-2 text-sm text-gray-500 dark:text-white/80">
                <span className="font-semibold">Нажмите или перетащите</span> для загрузки
              </p>
              <p className="text-xs text-gray-500 dark:text-white/80">PNG, JPG, GIF (макс. 800x400)</p>
              <Input id="dropzone-file" type="file" hidden onChange={handleFileChange} />
            </label>
          )}
        </div>

        {previewUrl && (
          <>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
            {children}
            <div className="flex justify-end gap-2">
              <Button appearance="secondary" onClick={onCloseAction}>
                Отмена
              </Button>
              <Button appearance="primary" onClick={handleConfirm}>
                Подтвердить
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
