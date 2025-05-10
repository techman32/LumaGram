import Navigation from '@/shared/ui/Navigation'
import Button from '@/shared/ui/Button'
import { BrickWall, Heart, PlusSquare, UserCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import UploadPost from '@/features/uploadPost/ui/UploadPost'

export default async function HeaderNavigation() {
  const cookieStore = await cookies()
  const username = cookieStore.get('username')?.value

  return (
    <Navigation>
      {/** Иконка уведомлений. Ведет на страницу /notifications */}
      <Button appearance="scalable">
        <Heart size={20} />
      </Button>
      <UploadPost />
      {username && (
        <Link href={`/${username}`}>
          <Button appearance="scalable">
            <UserCircle size={20} />
          </Button>
        </Link>
      )}
      <Link href={`/feed`}>
        <Button appearance="scalable">
          <BrickWall size={20} />
        </Button>
      </Link>
    </Navigation>
  )
}
