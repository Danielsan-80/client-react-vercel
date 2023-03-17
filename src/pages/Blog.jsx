import {useEffect, useState} from 'react'
import styles from '../modules/blog.module.css'
import BlogCard from '../components/BlogCard'

const Blog = () => {

  const [posts, setPosts] = useState(null)

useEffect(()=>{
  const getPosts = async ()=> {
    const res = await fetch('api/posts')
    const posts = await res.json()
   setPosts(posts)
  }

  getPosts()


  
}, [])


  return (
    <>
    <h1 className={styles.title}>My Blog</h1>
    <div className={styles.container}>
        {posts && posts.map((post)=>(
            <BlogCard key={post._id} post={post} />
        ))}
    </div>
    </>
  )
}

export default Blog