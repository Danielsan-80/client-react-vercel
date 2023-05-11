import styles from '../modules/authform.module.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'
import {Editor} from '@tinymce/tinymce-react'

const UpdateForm = ({originalPost}) => {
  
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState(null)
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{

    setTitle(originalPost.title)
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
        <Editor
        //  onInit={(evt, editor) => editorRef.current = editor}
        onChange={(evt, editor)=>setBody(editor.getContent())}
         initialValue={originalPost.body}
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Montserrat, sans-serif; font-size:16px }'
         }}
       />
        
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