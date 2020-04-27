import React from 'react';
import { Link } from 'react-router-dom';
// tooltip
import ReactTooltip from 'react-tooltip';
// styles
import './SignUp.css';
// images
import bgSignup from '../../assets/images/svgs/bg_signup.svg';
import logoImage from '../../assets/images/logo_alternative.png';

export function SignUp() {
    return (
        <div className="content" style={{ backgroundImage: `url(${bgSignup})` }}>
            <Link to="/" data-tip="Página inicial">
                <img src={logoImage} alt="Logo" className="content-logo" />
            </Link>

            <ReactTooltip place="bottom" type="dark" effect="solid" />

            <div className="content-form">
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-inline">
                        <input type="text" placeholder="Seu nome" autoFocus/>
                        <input type="text" placeholder="Seu sobrenome" />
                    </div>

                    <input type="email" placeholder="Seu e-mail aqui" />

                    <div className="form-inline">
                        <input type="password" placeholder="Digite uma senha" />
                        <input type="password" placeholder="Repita a senha" />
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>

                <div className="content-footer">
                    <p>Já possui conta?&nbsp;&nbsp;<Link to="/entrar">Entrar</Link></p>
                </div>
            </div>
        </div>
    );
}
