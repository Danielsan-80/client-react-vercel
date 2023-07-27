import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
// import { searchPost } from '../controllers/postController'
import styles from '../modules/searchform.module.css'
import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
  const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = async (e)=>{
        
        e.preventDefault()
        
        e.target.reset()
        navigate('/search?term='+searchTerm)
        
    }

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
        
        
        <input type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search"/>
        <i><FaSearch style={{color: 'orange'}} /></i>
        
        
    </form>
  )
}

export default SearchForm