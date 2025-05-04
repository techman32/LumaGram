import Navigation from '@/shared/ui/Navigation'
import Button from '@/shared/ui/Button'
import { BrickWall, Heart, PlusSquare, UserCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function HeaderNavigation() {
  const cookieStore = await cookies()
  const username = cookieStore.get('username')?.value

  return (
    <Navigation>
      {/** Иконка уведомлений. Ведет на страницу /notifications */}
      <Button appearance="scalable">
        <Heart size={20} />
      </Button>
      {/** Иконка добавления поста. Открывает поп-ап с загрузкой фотографии */}
      <Button appearance="scalable">
        <PlusSquare size={20} />
      </Button>
      {/** Иконка профиля пользователя. Ведет на страницу /profile (<username>) */}
      {username && (
        <Link href={`/${username}`}>
          <Button appearance="scalable">
            <UserCircle size={20} />
          </Button>
        </Link>
      )}
      {/** Иконка ленты (стены постов). Ведет на страницу /feed */}
      <Button appearance="scalable">
        <BrickWall size={20} />
      </Button>
    </Navigation>
  )
}
