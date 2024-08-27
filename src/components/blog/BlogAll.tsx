import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BlogAll() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPosts(data.posts)
      })
  }, [])
  console.log(posts)

  return (
    <div>
      <h1>Hien thi All</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  )
}
export default BlogAll
