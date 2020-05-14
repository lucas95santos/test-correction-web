import React from 'react';
import { Link } from 'react-router-dom';
// icons
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
// styles
import './Footer.css';
// images

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer__content">
        <div className="footer__item">
          <div className="footer__icon">
            <a
              href="https://facebook.com/testcorrection"
              title="Conheça a nossa página do Facebook"
              target="_blank"
            >
              <FiFacebook size={32} color="#ffffff" />
            </a>
          </div>
          <div className="footer__icon">
            <a
              href="https://instagram.com/testcorrection"
              title="Siga o nosso perfil no Instagram"
              target="_blank"
            >
              <FiInstagram size={32} color="#ffffff" />
            </a>
          </div>
          <div className="footer__icon">
            <a
              href="https://twitter.com/testcorrection"
              title="Siga o nosso perfil do Twitter"
              target="_blank"
            >
              <FiTwitter size={32} color="#ffffff" />
            </a>
          </div>
        </div>
        <div className="footer__info">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <span>Todos os direitos reservados.  TestCorrection © {year}</span>
      </div>
    </footer>
  );
}
