/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//import { onAuthStateChanged } from 'firebase/auth'
//import { Subscription } from '@supabase/gotrue-js' //Subscription.onAuthStateChanged
import { supabase } from './supabase/config'

// PrimeProvider
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";


// Hooks
import { useState, useEffect } from 'react'
//import { useAuthentication } from './firebase/useAuth'
import { useAuthentication } from './supabase/useAuth'
import { AuthProvider } from './firebase/AuthContext'

// Pages
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Post from './pages/Post'
import Search from './pages/Search'
import NewPost from './pages/NewPost'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import EditPost from './pages/EditPost'
import Settings from './pages/Settings'
import AboutUs from './pages/AboutUs';

import { ToastContainer } from 'react-toastify';



function App() {
  
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    //supabase.auth.onAuthStateChange

    supabase.auth.onAuthStateChange((_,user) => {
      setUser(user)
    })
  }, [auth])

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route
                path='/search'
                element={<Search />}
              />
              <Route
                path='/newpost'
                element={user ? <NewPost /> : <Login />}
              />
              <Route
                path='/'
                element={user ? <Feed /> : <Feed />}
              />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to='/' />}
              />
              <Route
                path='/posts/:id'
                element={user ? <Post /> : <Navigate to='/login' />}
              />
              <Route
                path='/profile'
                element={user ? <Profile /> : <Navigate to='/login' />}
              />
              <Route
                path='/notifications'
                element={user ? <Notifications /> : <Navigate to='/login' />}
              />
              <Route
                path='/edit/:id'
                element={user ? <EditPost /> : <Navigate to='/login' />}
              />
              <Route
                path='/settings'
                element={user ? <Settings /> : <Navigate to='/login' />}
              />
              <Route
                path='/about'
                element={!user ? <AboutUs /> : <AboutUs />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}

export default App