import React from 'react';
import { Link } from 'react-router-dom';
// icons
import {
  FiBarChart,
  FiFileText,
  FiBell,
  FiUser,
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
// styles
import './DashboardTop.css';
// images
import logoImage from '../../assets/images/logo_alternative.png';

export function DashboardTop(props) {
  const {
    profileName,
    profileDropdownOpen,
    profileDropdownOnclose,
    notificationDropdownOpen,
    notificationDropdownOnClose,
    notificationAmount
  } = props;

  return (
    <nav className="dashboard__top">
      <img src={logoImage} alt="Logo" className="dashboard__logo" />
      <ul className="menu">
        <li className="menu__item">
          <Link to="/relatorios" title="Veja os relatórios detalhados">
            <FiFileText size={16} color="#d8a730" style={{ marginRight: 8 }} />
            Relatórios
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/estatisticas" title="Acompanhes as estatísticas geradas">
            <FiBarChart size={16} color="#d8a730" style={{ marginRight: 8 }} />
            Estatísticas
          </Link>
        </li>
        <li
          className="menu__item"
          onClick={() => notificationDropdownOnClose(!notificationDropdownOpen)}
        >
          <FiBell size={16} color="#d8a730" style={{ marginRight: 8 }} />
          Notificações
          {
            notificationAmount > 0 ?
            <span className="notification">{notificationAmount}</span> :
            null
          }
        </li>
        <li
          className="menu__item"
          onClick={() => profileDropdownOnclose(!profileDropdownOpen)}
        >
          <FiUser size={16} color="#d8a730" style={{ marginRight: 8 }} />
          {profileName}
          <FiChevronDown size={16} style={{ marginLeft: 8 }} />
        </li>
      </ul>

      <div
        className="dropdown dropdown--notification"
        style={{
          visibility: notificationDropdownOpen ? 'visible' : 'hidden',
          opacity: notificationDropdownOpen ? 1 : 0
        }}
      >
        <div className="dropdown__item" style={{ cursor: "default" }}>
          <FiAlertCircle size={15} color="#d8a730" style={{ marginRight: 8 }} />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit
          <FiXCircle
            size={13}
            style={{ marginLeft: 8, cursor: "pointer" }}
            title="Remover notificação"
          />
        </div>

        <div className="dropdown__divider" style={{ width: "95%", margin: "0 auto" }} />

        <div className="dropdown__item" style={{ cursor: "default" }}>
          <FiCheckCircle size={15} color="#43a047" style={{ marginRight: 8 }} />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit
          <FiXCircle
            size={13}
            style={{ marginLeft: 8, cursor: "pointer" }}
            title="Remover notificação"
          />
        </div>
      </div>

      <div
        className="dropdown dropdown--profile"
        style={{
          visibility: profileDropdownOpen ? 'visible' : 'hidden',
          opacity: profileDropdownOpen ? 1 : 0
        }}
      >
        <Link to="/perfil">
          <div className="dropdown__item">
            <FiUser size={14} color="#d8a730" style={{ marginRight: 8 }} />
            Perfil
          </div>
        </Link>

        <Link to="/configuracoes">
          <div className="dropdown__item">
            <FiSettings size={14} color="#d8a730" style={{ marginRight: 8 }} />
            Configurações da conta
          </div>
        </Link>

        <div className="dropdown__divider" />

        <div className="dropdown__item">
          <FiLogOut size={14} color="#d32f2f" style={{ marginRight: 8 }} />
          Sair
        </div>
      </div>
    </nav>
  );
}
