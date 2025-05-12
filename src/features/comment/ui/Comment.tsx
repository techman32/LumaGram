import Textarea from '@/shared/ui/Textarea'

export default function Comment() {
  return (
    <form className="w-full">
      <Textarea placeholder="Оставьте свой комментарий..." />
    </form>
  )
}
