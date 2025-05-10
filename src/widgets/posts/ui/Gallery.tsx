'use client'
import { useState } from 'react'
import { FeedPostBody } from '@/shared/lib/types/posts'
import Post from '@/features/post/ui/Post'
import PostModal from '@/features/postModal/ui/PostModal'

export default function Gallery({ posts }: { posts: FeedPostBody[] }) {
  const [selectedPost, setSelectedPost] = useState<FeedPostBody | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} onClick={() => setSelectedPost(post)} />
        ))}
      </div>

      {selectedPost && (
        <PostModal
          image={`http://localhost:8000/${selectedPost.image}`}
          description={selectedPost.description}
          likeCount={selectedPost.likeCount}
          postId={selectedPost.id}
          likedByCurrentUser={false}
          commentCount={selectedPost.commentCount}
          onCloseAction={() => setSelectedPost(null)}
        />
      )}
    </>
  )
}
