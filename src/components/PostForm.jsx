import styles from '../modules/authform.module.css'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'

const PostForm = () => {

  
  
  const {user} = useAuthContext()
  const currLoc = useLocation()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('travel')
  const [tags, setTags] = useState('')
  const [error, setError] = useState(null)
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if(currLoc.pathname === '/create') {
      
      const postTags = tags.split(',');
      
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+user.token
        },
        body: JSON.stringify({email:user.email, title, body, category, tags: postTags})
      })

      const json = await res.json()

      if(!res.ok) {
        setError(json.error)
      }

      if(res.ok) {
        setError(null)
        navigate('/blog')
      }


    }

  }

  return (
    <form onSubmit={handleSubmit} method="post">
        <label>Title</label>
        <input type="text"  onChange={(e)=>setTitle(e.target.value)} value={title}/>
        <label>Body</label>
        <input type="text"  onChange={(e)=>setBody(e.target.value)} value={body}/>
        
        <label>Category:</label>
        <select name="category" onChange={(e)=>setCategory(e.target.value)} value={category}>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="art">Art</option>
          <option value="literature">Literature</option>
        </select>

        <label>Tags (comma separated):</label>
        <input name="tags" onChange={(e)=>setTags(e.target.value)} value={tags}>
        </input>
    
        <button>Submit</button>
        {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}

export default PostForm