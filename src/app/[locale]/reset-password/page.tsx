import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { redirect } from 'next/navigation'

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  if (!searchParams?.token) {
    redirect('/auth')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md border-gray-200 max-w-96 w-full p-4 flex flex-col gap-6">
        <h1 className="text-xl font-bold text-center">Восстановление пароля</h1>
        <form className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Пароль</h2>
            <Input placeholder="Введите пароль" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Повторный пароль</h2>
            <Input placeholder="Повторите пароль" />
          </div>
          <Button appearance="primary">Сохранить</Button>
        </form>
      </div>
    </div>
  )
}
