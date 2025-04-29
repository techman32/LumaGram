import Navigation from '@/shared/ui/Navigation'
import Button from '@/shared/ui/Button'
import { BrickWall, Heart, PlusSquare, UserCircle } from 'lucide-react'

export default function HeaderNavigation() {
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
      <Button appearance="scalable">
        <UserCircle size={20} />
      </Button>
      {/** Иконка ленты (стены постов). Ведет на страницу /feed */}
      <Button appearance="scalable">
        <BrickWall size={20} />
      </Button>
    </Navigation>
  )
}
