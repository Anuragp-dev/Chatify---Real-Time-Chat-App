import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/HomePage'
import Signup from './pages/signUpPages'
import Login from './pages/LoginPage'
import Settings from './pages/SettingsPage'
import Profile from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth && !authUser) return (

    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div >
  )


  return (
    <div  >

      <Navbar />


      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>





    <Toaster/>

    </div>
  )
}

export default App