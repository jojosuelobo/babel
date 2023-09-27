/* eslint-disable no-unused-vars */
import './header.sass';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import profilePic from '../../../public/logoUVV.png'

import { Link, useNavigate } from 'react-router-dom'

//import { useAuthentication } from '../../firebase/useAuth';
import { useAuthentication } from '../../supabase/useAuth';
import { useAuthValue } from '../../firebase/AuthContext'

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate()
  const { user } = useAuthValue()
  const { logout } = useAuthentication()
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === '')
      return
    return navigate(`/search?q=${query.trim()}`)
  }

  return (
    <header className="header">
      <div className="left-section">
        <div className="search-container">
          <FaSearch onClick={handleSearch} className="search-icon" />
          <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Buscar" className="search-bar" />
        </div>
      </div>
      <div className="center-section">
        <img src="../../../public/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="right-section">
        <div className="avatar" onClick={toggleMenu}>
          <img src={profilePic} alt="Avatar" />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <ul>
                <li><a href="#">Configurações</a></li>
                <li><Link onClick={logout} to={'/login'}>Sair</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


export default Header;
