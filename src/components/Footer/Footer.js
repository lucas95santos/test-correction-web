import React from 'react';
// styles
import './Footer.css';
// images

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-bottom">
                <span>Todos os direitos reservados.  TestCorrection © {year}</span>
            </div>
        </footer>
    );
}
