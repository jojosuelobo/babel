/* eslint-disable no-unused-vars */
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

// Hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './firebase/useAuth'
import { AuthProvider } from './firebase/AuthContext'

// Pages
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Post from './pages/Post'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  return (
    <div className='App'>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path='/' element={<Feed />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to='/'/>} />
              <Route path='/posts/:id' element={user ? <Post /> : <Navigate to='/login'/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
    )
}

export default App