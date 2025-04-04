import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Signup from './pages/signUpPages'
import Login from './pages/LoginPage'
import Settings from './pages/SettingsPage'
import Profile from './pages/ProfilePage'


  const App = () => {
  return (
    <div>

      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>





    </div>
  )
}

export default App