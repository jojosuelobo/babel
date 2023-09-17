/* eslint-disable no-unused-vars */
import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Routes
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

// Pages
import Register from './pages/Register'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Post from './pages/Post'


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/posts/:id",
        element: <Post/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)