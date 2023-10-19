/* eslint-disable no-unused-vars */
import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
import { useState, useEffect } from 'react'
import { useAuthentication } from './firebase/useAuth.js'

const [user, setUser] = useState(undefined)
const { auth } = useAuthentication()

const loadingUser = user === undefined

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setUser(user)
  })
}, [auth])
*/


ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)