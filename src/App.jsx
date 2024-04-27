import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

//components
import Home from './pages/home/Home'
import Login from './pages/Login'
import Register from './pages/Signup'
import { setAxiosInstanceToken } from './services/axiosInstance'
import { PostService } from './services/PostService'

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();

  const handleCheckToken = async () => {
    try {
      await PostService.getCurrentUserPosts();
      setAxiosInstanceToken(localStorage.getItem('token'))
    } catch (error) {
      console.log(error);
      navigate('/login')
    }
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
    </Routes>
  )
}

export default App
