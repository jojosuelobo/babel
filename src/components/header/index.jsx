import './header.sass';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="left-section">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
      </div>
      <div className="center-section">
        <img src="../../../public/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="right-section">
        <div className="avatar" onClick={toggleMenu}>
          <img src="../../../public/avatar.jpg" alt="Avatar" />
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
