import React from 'react';
import { Link } from 'react-router-dom';
// icons
import { FiArrowLeft } from 'react-icons/fi';
// styles
import './NotFound.css';
// images
import notFoundImage from '../../assets/images/svgs/not_found.svg';

export default function NotFound() {
  return (
    <div className="not-found">
      <Link to="/" className="not-found__link">
        <div>
          <FiArrowLeft size={28} color="#dc7037" />
          Voltar
        </div>
      </Link>
      <img
        src={notFoundImage}
        alt="Não encontrado"
        className="not-found__image"
      />
      <h1 className="not-found__text">Página não encontrada</h1>
    </div>
  );
}
