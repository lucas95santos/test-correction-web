import React, { useEffect, useState } from 'react';
// styles
import './Homepage.css';
// components
import { Navbar } from '../../components';
// icons
import { FiChevronDown } from 'react-icons/fi';
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
                            </div>
                        </div>
                    </div>
                    <div className="header-footer">
                        <span>Saiba mais</span>
                        <FiChevronDown size={80} color="#ffffff" className="header-icon" />
                    </div>
                </div>
            </header>

            <section></section>
        </>
    );
}
