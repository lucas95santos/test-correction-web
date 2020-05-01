import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './Navbar.css';
// images
import logo from '../../assets/images/logo.png';
import menuCollapsed from '../../assets/icons/menu_collapsed.png';

export function Navbar({ color, rootLink, links, showMenuCollapsed }) {
  return (
    <nav className={color ? 'nav--primary' : 'nav--transparent'}>
      <div className="container nav">
        <div className="nav__logo">
          <img src={logo} alt="Logo" onClick={rootLink.action} />
        </div>

        <div className="nav-menu">
          <ul>
            {links.map(link => (
              <li className="nav-menu__item" key={link.id}>
                <span
                  onClick={link.action}
                >
                  {link.name}
                </span>
              </li>
            ))}
            <li className="nav__button">
              <Link to="/cadastro">
                <button type="button">
                  Cadastre-se
                </button>
              </Link>
            </li>
            <li className="nav__button">
              <Link to="/entrar">
                <button type="button">
                  Entrar
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="nav__collapsed"
          onClick={showMenuCollapsed}
        >
          <img src={menuCollapsed} alt="menu_collapsed" />
        </div>
      </div>
    </nav>
  );
}
