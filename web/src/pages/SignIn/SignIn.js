import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
// form validation module
import * as Yup from 'yup';
// tooltip
import ReactTooltip from 'react-tooltip';
// styles
import './SignIn.css';
// images
import logoImage from '../../assets/images/logo_alternative.png';
import signinImage from '../../assets/images/svgs/signin.svg';

// validation config
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
});

export function SignIn() {
  const handleSubmit = data => {
    console.log(data);
  }

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

          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="email" type="email" placeholder="Digite seu e-mail" autoFocus />
            <Input name="password" type="password" placeholder="Digite sua senha" />

            <div className="form-options">
              <Link to="/reset">Esqueceu sua senha?</Link>
            </div>

            <button type="submit">Entrar</button>
          </Form>

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
