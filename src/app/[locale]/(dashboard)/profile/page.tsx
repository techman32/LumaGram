import ProfileHeader from '@/entities/profile/ui/ProfileHeader'
import Posts from '@/entities/posts/ui/Posts'
import { cookies } from 'next/headers'

const getProfileData = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')
  const id = cookieStore.get('userId')
  const response = await fetch(`http://109.73.197.191/api/users/${id?.value}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token?.value,
    },
  })

  // request(url, {
  //   method: 'GET',
  //   cache: 'no-cache',
  // })
 // Вынести в отдельную утилиту где будет так же передаваться кука
  return await response.json()
}

export default async function ProfilePage() {
  const {data} = await getProfileData()

  return (
    <div className="flex flex-col mx-4 md:mx-[10%]">
      <ProfileHeader profileData={data} />
      <Posts />
    </div>
  )
}
