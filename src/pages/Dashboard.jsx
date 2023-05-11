import styles from '../modules/dashboard.module.css'
import {Link} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'
import {useState, useEffect} from 'react'
import Loading from '../components/Loading'


const Dashboard = () => {
  const {user} = useAuthContext()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const regex = /(<([^>]+)>)/ig;
  
  
  
  useEffect(()=>{
    const getPosts = async()=>{
      const res = await fetch('/api/posts')
      const json = await res.json()
      const posts = json.filter(post=>
        post.author.name===user.name
      )
     
      setPosts(posts)
      setLoading(false)
     
    }

    
    getPosts()
  }, [posts])


  const handleDelete = async(id)=>{
    await fetch('/api/posts/'+id, {
      method: 'DELETE'
    })
  }

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>{user.name}'s Dashboard</h1>

    
    {posts.length != 0 ?  
    <table>
      <thead>
    <tr>
      <th className={styles.headings}>Title</th>
      <th className={styles.headings}>Description</th>
      <th className={styles.headings}>Published</th>
    </tr>
    </thead>
    <tbody>
      {posts.map(post=>(
        <tr key={post._id}>
         
         <td><Link to={'/blog/'+post._id}>{post.title} </Link> </td>
        <td>{post.body.replace(regex, '').substring(0,20)+'...'}</td>
        <td>{Intl.DateTimeFormat("it-IT", {weekday: "long", month: "short", year: "numeric", day: "numeric"}).format(new Date(post.updatedAt))}</td>
        <td>       
        
        <Link to={'/update/'+post._id}>
            <button className={styles.dashboardButton}>
            Update
            </button>
          </Link>
            
        </td>
        <td>
          <button className={styles.dashboardButton} onClick={()=>handleDelete(post._id)}>Delete</button>
        </td>
      </tr>
      ))}
    </tbody>
    </table>

    :

    <div className={styles.message}>
    {loading ? <Loading />
    : 
    <>
    <h1>You have no posts yet !</h1>
    <p>Time to write something...</p>
    </>
      }
  </div>
    }

    <Link to="/create" className={styles.newPost}>
      Add new Post
    </Link>
    </div>
  )
}

export default Dashboard