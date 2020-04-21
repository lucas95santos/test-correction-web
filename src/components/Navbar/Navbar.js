import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './Navbar.css';
// images
import logo from '../../assets/images/logo.png';
import menuCollapsed from '../../assets/icons/menu_collapsed.png';

export function Navbar({ color, rootLink, links }) {
    return (
        <nav class={color ? 'nav-primary' : 'nav-transparent'}>
            <div class="container nav-content">
                <div class="nav-content-logo">
                    <img src={logo} alt="Logo" onClick={rootLink.action} />
                </div>

                <div class="nav-content-menu">
                    <ul>
                        {links.map(link => (
                            <li className="item-menu" key={link.id}>
                                <span
                                    onClick={link.action}
                                >
                                    {link.name}
                                </span>
                            </li>
                        ))}
                        <li className="li-button">
                            <Link to="/cadastro">
                                <button type="button">
                                    Cadastre-se
                                </button>
                            </Link>
                        </li>
                        <li className="li-button">
                            <Link to="/entrar">
                                <button type="button">
                                    Entrar
                                </button>
                            </Link>
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
