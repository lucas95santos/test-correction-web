import React, { useEffect, useState } from 'react';
// styles
import './Homepage.css';
// components
import { Navbar } from '../../components';
// images
import bgHeader from '../../assets/images/bg_header.jpg';

export function Homepage() {
    const [navbarColor, setNavbarColor] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            changeNavbarColor();
        })
    }, []);

    const changeNavbarColor = () => {
        const windowOffset = window.pageYOffset;

        setNavbarColor(windowOffset > 80);
    }

    return (
        <>
            <header style={{ backgroundImage: `url(${bgHeader})` }}>
                <Navbar color={navbarColor} />

                <div className="header">
                    <div className="container">
                        <div className="header-content">
                            <div className="header-content-info">
                                <div>
                                    <h1>Uma solução eficiente para a correção de provas objetivas</h1>
                                    <h2>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Commodi quo minus vero eveniet exercitationem quod incidunt.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Commodi quo minus vero eveniet exercitationem quod incidunt.
                                </h2>
                                </div>
                                <button
                                    type="button"
                                    className="btn-homepage"
                                >
                                    Cadastre-se hoje
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section></section>
        </>
    );
}
