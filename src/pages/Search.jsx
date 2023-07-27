import {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from '../modules/blog.module.css'
import BlogCard from '../components/BlogCard'

const Search = () => {
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

    if(!res.ok){
      const error = await res.json()
      setPosts(null)
      setError(error)
      return
   
    }
  
    const posts = await res.json()
    setPosts(posts)
    setError(null)
  }

  getPosts()
  
}, [searchParams])


  return (
    <>
    <h1 className={styles.title}>Search Results for: {searchParams.get('term')}</h1>
    {error && <p>{error.error}</p>}
    <div className={styles.container}>
    {posts && posts.map((post)=>(
       <BlogCard key={post._id} post={post} />
   ))}
    </div>
    
    </>
  )
}

export default Search