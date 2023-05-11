import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import styles from '../modules/post.module.css'

const Post = () => {
    const {id} = useParams();

    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});
    const [date, setDate]= useState('');

    useEffect(()=>{

        const getPost = async()=>{
        const res = await fetch('/api/posts/'+id)
        const post = await res.json()
        setPost(post)
       setAuthor(post.author)
       setDate(Intl.DateTimeFormat("it-IT", {weekday: "long", month: "short", year: "numeric", day: "numeric"}).format(new Date(post.createdAt)))
      
      

    }

    getPost()
    

    }, [])
    

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>{post.title}</h1>
    <div className={styles.postDetails}>
        <p><span>Written By:</span> {author.name} {author.email} <span>On:</span> {date} <span>Category:</span> {post.category}</p>
    </div>
   
    <div className={styles.postImg} >
    <img src="//unsplash.it/930/700"/>
    </div>

    <span className={styles.postBody} dangerouslySetInnerHTML={{ __html: post.body}} />
        <div className="post-body"></div>
    
    </div>
  )
}

export default Post

