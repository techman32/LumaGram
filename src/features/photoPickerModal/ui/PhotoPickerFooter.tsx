import Button from '@/shared/ui/Button'
import { ReactNode } from 'react'

type PhotoPickerActionsProps = {
  zoom: number
  setZoom: (zoom: number) => void
  children?: ReactNode
  onCloseAction: () => void
  onSubmitAction: () => void
}

export default function PhotoPickerFooter({
  zoom,
  setZoom,
  children,
  onCloseAction,
  onSubmitAction,
}: PhotoPickerActionsProps) {
  return (
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
        <Button appearance="primary" onClick={onSubmitAction}>
          Опубликовать
        </Button>
      </div>
    </>
  )
}
