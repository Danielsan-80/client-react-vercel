import styles from '../modules/login.module.css'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import UpdateForm from '../components/UpdateForm'

const Update = () => {
  const {id}= useParams()

  const [post, setPost] = useState({});

  useEffect(()=>{

      const getPost = async()=>{
      const res = await fetch('/api/posts/'+id)
      const post = await res.json()
      setPost(post)
  }

  getPost()
  

  }, [])
  

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Update Post</h1>
        <UpdateForm originalPost = {post}/>
    </div>
  )
}

export default Update