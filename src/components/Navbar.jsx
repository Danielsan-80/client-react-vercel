import styles from '../modules/navbar.module.css'
import { useAuthContext } from '../hooks/useAuthContext'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const {user, dispatch}= useAuthContext()
  const handleLogout = ()=> {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }


  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>My</span>Logo
      </div>

      <div className={styles.links}>
        <Link className={styles.anchor} to="/blog">Blog</Link>
        <Link to="" className={styles.anchor}>About</Link>
        <Link to="" className={styles.anchor}>Contact</Link>
        {!user && (<Link to="/login" className={styles.anchor}>Log In</Link>)}
        {!user && (<Link to="/register" className={styles.anchor}>Register</Link>)}  
        {user && <><Link to="/login" className={styles.anchor} onClick={handleLogout}>Logout</Link>
        <Link to="/dashboard" className={styles.anchor}>Dashboard</Link>
        </>
        }
      </div>

    </nav>
  )
}

export default Navbar