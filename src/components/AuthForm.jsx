import styles from '../modules/authform.module.css'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'

const AuthForm = () => {

  const {dispatch} = useAuthContext()
  const currLoc = useLocation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if(currLoc.pathname === '/register') {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      })

      const json = await res.json()

      if(!res.ok) {
        setError(json.error)
      }

      if(res.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        setError(null)
        navigate('/dashboard')
      }


    }

    else if(currLoc.pathname === '/login') {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      })

      const json = await res.json()

      if(!res.ok) {
        setError(json.error)
      }

      if(res.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        setError(null)
        navigate('/dashboard')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post">
        {currLoc.pathname==='/register' && <label>Name</label>}
        {currLoc.pathname==='/register' && <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>}
        <label>Email</label>
        <input type="text"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label>Password</label>
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button>Submit</button>
        {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}

export default AuthForm