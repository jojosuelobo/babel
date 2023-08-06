/* eslint-disable no-unused-vars */
import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Routes
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

// Pages

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <App />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
