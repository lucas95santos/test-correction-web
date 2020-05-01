import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './MenuCollapsed.css';

export function MenuCollapsed({ showUp, links, showMenu }) {

  const handleClickLink = action => {
    action();
    showMenu();
  }

  return (
    <aside
      style={{
        visibility: showUp ? 'visible' : 'hidden',
        opacity: showUp ? 1 : 0
      }}
    >
      <div className="container aside-menu">
        <ul>
          {links.map(link => (
            <li className="aside-menu__item" key={link.id}>
              <span
                onClick={() => handleClickLink(link.action)}
              >
                {link.name}
              </span>
            </li>
          ))}
          <li className="aside__button">
            <Link to="/cadastro">
              <button type="button">
                Cadastre-se
                </button>
            </Link>
          </li>
          <li className="aside__button">
            <Link to="/entrar">
              <button type="button">
                Entrar
                </button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
