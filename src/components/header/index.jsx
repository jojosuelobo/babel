import './header.sass';
//import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
      </div>
      <div className="center-section">
        <img src="../../../public/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="right-section">
           <div className="menu-icon">
                 ☰
           </div>
      </div>
    </header>
  )
}


export default Header;
