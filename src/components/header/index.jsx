/* eslint-disable no-unused-vars */
import './header.sass';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Link } from 'react-router-dom'

import { useAuthentication } from '../../firebase/useAuth';
import { useAuthValue } from '../../firebase/AuthContext'

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const { user } = useAuthValue()
  const { logout} = useAuthentication()

  return (
    <header className="header">
      <div className="left-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar" className="search-bar" />
        </div>
      </div>
      <div className="center-section">
        <img src="../../../public/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="right-section">
        <div className="avatar" onClick={toggleMenu}>
          <img src="" alt="Avatar" />
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
