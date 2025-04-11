'use client'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import Button from '@/shared/ui/Button'
import { Image as ImageIcon } from 'lucide-react'

export default function ImageUploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.classList.remove('overflow-hidden')

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      setSelectedFile(null)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [isOpen, onClose, previewUrl])

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleClickUploadArea = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    if (selectedFile) {
      console.log('Выбран файл:', selectedFile.name)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black dark:border dark:border-white/10 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg p-8 mb-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            onClick={handleClickUploadArea}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            {previewUrl ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-full aspect-square overflow-hidden rounded-md">
                  <img src={previewUrl} alt="Предпросмотр" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-black dark:text-white opacity-50">Нажмите для выбора другой фотографии</p>
              </div>
            ) : (
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ImageIcon size={48} />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Выберите фотографию</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Нажмите для загрузки файла</p>
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-white/10 px-4 py-3 flex justify-end space-x-3">
          <Button appearance="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit} disabled={!selectedFile}>
            Далее
          </Button>
        </div>
      </div>
    </div>
  )
}
