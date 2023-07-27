import {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from '../modules/blog.module.css'
import BlogCard from '../components/BlogCard'

const Blog = () => {
  const [searchParams] = useSearchParams()  
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

useEffect(()=>{
  const getPosts = async ()=> {
    const res = await fetch('/api/posts/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchTerm: searchParams.get('term')})
    })
  
    const data = await res.json()
    if(!res.ok){
      return setError(data)
    }
    
    setError(null)
    setPosts(data)
  }

  getPosts()
  
}, [searchParams])


  return (
    <>
    <h1 className={styles.title}>Search Results for: {searchParams.get('term')}</h1>
    
    <div className={styles.container}>
        {error ? <p>{error.error}</p> : posts.map((post)=>(
            <BlogCard key={post._id} post={post} />
        ))}
        
    </div>
    </>
  )
}

export default Blog