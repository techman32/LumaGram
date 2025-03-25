import AuthForm from '@/entities/auth-form/ui/AuthForm'

export default function AuthPage() {
  return (
    <div className="h-screen w-full flex flex-col gap-6 justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold">Добро пожаловать в LumaGram</h1>
      <AuthForm/>
    </div>
  )
}
