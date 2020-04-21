import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './Navbar.css';
// images
import logo from '../../assets/images/logo1.1.png';
import menuCollapsed from '../../assets/icons/menu_collapsed.png';

export function Navbar({ color }) {
    return (
        <nav class={color ? 'nav-primary' : 'nav-transparent'}>
            <div class="container nav-content">
                <Link to="/">
                    <div class="nav-content-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </Link>

                <div class="nav-content-menu">
                    <ul>
                        <li className="item-menu">
                            <a href="#about">Sobre o sistema</a>
                        </li>
                        <li className="item-menu">
                            <a href="#atuation-areas">Vantagens</a>
                        </li>
                        <li className="item-menu">
                            <a href="#works">Contato</a>
                        </li>
                        <li className="li-button">
                            <Link to="/signup">
                                <button type="button">
                                    Cadastre-se
                                </button>
                            </Link>
                        </li>
                        <li className="li-button">
                            <Link to="/signin">
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
