import React from 'react';
import { Link } from 'react-router-dom';
// tooltip
import ReactTooltip from 'react-tooltip';
// styles
import './SignIn.css';
// images
import logoImage from '../../assets/images/logo_alternative.png';
import signinImage from '../../assets/images/svgs/signin.svg';

export function SignIn() {
    return (
        <div className="content">
            <Link to="/" data-tip="Página inicial">
                <img src={logoImage} alt="Logo" className="content-logo" />
            </Link>

            <ReactTooltip place="bottom" type="dark" effect="solid" />

            <div className="content-items">
                <div className="form-item">
                    <div className="content-top">
                        <h1>Informe suas credenciais para acessar o sistema</h1>
                    </div>
                    <form onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder="Digite seu e-mail" />
                        <input type="password" placeholder="Digite sua senha" />

                        <div className="form-options">
                            <Link to="/reset">Esqueceu sua senha?</Link>
                        </div>

                        <button type="submit">Entrar</button>
                    </form>

                    <div className="content-footer">
                        <p>Não possui conta?&nbsp;&nbsp;<Link to="/cadastro">Cadastre-se</Link></p>
                    </div>
                </div>

                <div className="img-item">
                    <img src={signinImage} alt="Entrar" />
                </div>
            </div>
        </div>
    );
}
