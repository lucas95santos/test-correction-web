import React from 'react';
// styles
import './Navbar.css';
// images
import logo from '../../assets/images/logo1.1.png';
import menuCollapsed from '../../assets/icons/menu_collapsed.png';

export function Navbar({ color }) {
  return (
    <nav class={color ? 'nav-primary' : 'nav-transparent'}>
      <div class="container nav-content">
        <a href="/">
          <div class="nav-content-logo">
            <img src={logo} alt="Logo" />
          </div>
        </a>

        <div class="nav-content-menu">
          <ul>
            <li>
              <a href="#about">Sobre o sistema</a>
            </li>
            <li>
              <a href="#atuation-areas">Vantagens</a>
            </li>
            <li>
              <a href="#works">Contato</a>
            </li>
            <li>
              <a href="#contact">Cadastre-se hoje</a>
            </li>
          </ul>
        </div>

        <div class="nav-content-menu-collapsed">
          <img src={menuCollapsed} alt="menu_collapsed" />
        </div>
      </div>
    </nav>
  );
}
