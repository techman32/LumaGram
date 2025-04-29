export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  return <div className="h-full overflow-scroll">Страница профиля {username}</div>
}
