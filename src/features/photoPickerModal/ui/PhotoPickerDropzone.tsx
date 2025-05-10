import { CloudUpload } from 'lucide-react'
import { ChangeEvent } from 'react'
import Input from '@/shared/ui/Input'

type PhotoPickerDropzoneProps = {
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function PhotoPickerDropzone({ onChangeAction }: PhotoPickerDropzoneProps) {
  return (
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 dark:border-white/20 cursor-pointer transition-colors duration-300"
    >
      <CloudUpload size={32} className="text-gray-500 dark:text-white/80" />
      <p className="mb-2 text-sm text-gray-500 dark:text-white/80">
        <span className="font-semibold">Нажмите или перетащите</span> для загрузки
      </p>
      <p className="text-xs text-gray-500 dark:text-white/80">PNG, JPG</p>
      <Input id="dropzone-file" type="file" hidden onChange={onChangeAction} />
    </label>
  )
}
