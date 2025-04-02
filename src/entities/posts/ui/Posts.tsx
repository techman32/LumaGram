import Post from '@/entities/posts/ui/Post'

export default function Posts() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Post key={i}/>
      ))}
    </div>
  )
}
