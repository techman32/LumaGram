'use client'
import { useState } from 'react'
import { PostDto } from '@/shared/common/types/posts'
import Post from '@/features/post/ui/Post'
import PostModal from '@/features/postModal/ui/PostModal'
import Button from '@/shared/ui/Button'

export default function Gallery({ posts }: { posts: PostDto[] }) {
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} onClick={() => setSelectedPost(post)} />
        ))}
      </div>
      <div className="flex justify-center pb-4">
        <Button appearance="secondary">Загрузить еще</Button>
      </div>
      {selectedPost && <PostModal post={selectedPost} onCloseAction={() => setSelectedPost(null)} />}
    </>
  )
}
