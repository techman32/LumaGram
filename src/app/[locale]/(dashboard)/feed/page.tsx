// 'use client'
import Posts from '@/entities/posts/ui/Posts'
import { request } from '@/shared/api'

const getPosts = async () => {
  try {
    return await request('test')
  } catch (e) {
    console.error(e)
  }
}

export default async function FeedPage() {
  const result = await getPosts()
  console.log(result)

  // const handleClick = async () => {
  //   new Promise(resolve =>
  //     getPosts()
  //       .then((r) => resolve(r))
  //   ).then(console.log).catch(console.error)
  // }

  return (
    <div className="container px-4 mx-auto sm:px-0">
      {/*<button onClick={handleClick}>Get</button>*/}
      <Posts />
    </div>
  )
}


