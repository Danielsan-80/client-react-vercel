import styles from '../modules/authform.module.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'

const UpdateForm = ({originalPost}) => {
  
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{

    setTitle(originalPost.title)
    setBody(originalPost.body)
    setCategory(originalPost.category)
    setTags(originalPost.tags)
  },[originalPost])

  const handleSubmit = async (e) =>{
    e.preventDefault()
   
      const res = await fetch('/api/posts/'+originalPost._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body, category, tags})
      })

      const json = await res.json()

      if(!res.ok) {
        setError(json.error)
      }

      if(res.ok) {
        setError(null)
        navigate('/dashboard')
      }
    }

  return (
    <form onSubmit={handleSubmit} method="put">
        <label>Title</label>
        <input type="text"  onChange={(e)=>setTitle(e.target.value)} value={title || ''}/>
        <label>Body</label>
        <input type="text"  onChange={(e)=>setBody(e.target.value)} value={body || ''}/>
        
        <label>Category:</label>
        <select name="category" onChange={(e)=>setCategory(e.target.value)} value={category || ''}>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="art">Art</option>
          <option value="literature">Literature</option>
        </select>

        <label>Tags (comma separated):</label>
        <input name="tags" onChange={(e)=>setTags(()=>e.target.value.split(','))} value={tags || []}>
        </input>
    
        <button>Submit</button>
        {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}

export default UpdateForm