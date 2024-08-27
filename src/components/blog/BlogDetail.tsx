import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Goback from '../goback/Goback'

function BlogDetail() {
  const params = useParams()
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBlog(data)
      })
  }, [])
  console.log(blog)

  return (
    <>
      <Goback />
      <h1>Trang thong tin chi tiet</h1>
      {blog ? <h2>{blog.title}</h2> : <h2>Loading...</h2>}
    </>
  )
}

export default BlogDetail
