import './header.sass';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

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
                <li><a href="#">Sair</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


export default Header;
