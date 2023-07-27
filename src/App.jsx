import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Blog from './pages/Blog'
import Search from './pages/Search'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Update from './pages/Update'


const App = () => {
  const {user} = useAuthContext()
  

  return (
    <BrowserRouter>
    <Layout>
    <Routes>
    
      <Route path="/" element={<Landing />}/>
      <Route path="/blog" element={<Blog />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/create" element={user?<Create />:<Navigate to="/login" replace />}/>
      <Route path="/login" element={!user ?<Login /> : <Navigate to="/dashboard" replace />}/>
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />}/>
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login' replace />}/>
      <Route path="/blog/:id" element={<Post />}/>
      <Route path="/update/:id" element={<Update />}/>
    </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App
