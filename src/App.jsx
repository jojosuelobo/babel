import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <div className='container'>
        <Outlet />
      </div>
    </div>)
}

export default App

// Ajuste