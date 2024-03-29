import styles from '../modules/authform.module.css'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'
import { Editor } from '@tinymce/tinymce-react'

const PostForm = () => {

  const {user} = useAuthContext()
  const currLoc = useLocation()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState(null)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('travel')
  const [tags, setTags] = useState('')
  const [error, setError] = useState(null)
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if(currLoc.pathname === '/create') {
      
      const postTags = tags.split(',');

      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('featuredImg', file)
      formData.append('category', category)
      formData.append('tags', postTags)
      formData.append('email', user.email)
      formData.append('token', user.token)
      
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          
          'Authorization': 'Bearer '+user.token
        },
        body: formData
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
        <Editor
        //  onInit={(evt, editor) => editorRef.current = editor}
        onChange={(evt, editor)=>{
          setBody(editor.getContent())
        }}
         initialValue="<p>Write your content here.</p>"
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



        {/* <input type="text"  onChange={(e)=>setBody(e.target.value)} value={body}/> */}

        <label>Image:</label>
        <div className="form-fields">
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} name="featured_img"></input>
        </div>
        
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