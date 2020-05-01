import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as AuthActions from '../../store/modules/auth/actions';
// unform
import { Form, Input } from '@rocketseat/unform';
// form validation module
import * as Yup from 'yup';
// tooltip
import ReactTooltip from 'react-tooltip';
// styles
import './SignUp.css';
// images
import bgSignup from '../../assets/images/svgs/bg_signup.svg';
import logoImage from '../../assets/images/logo_alternative2.png';

// validation config
const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter 6 caracteres no mínimo')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .required('Confirme a sua senha')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
});

function SignUp(props) {
  const { signUpRequest, loading } = props;

  const handleSubmit = ({ name, email, password }) => {
    signUpRequest(name, email, password);
  }

  return (
    <div className="content" style={{ backgroundImage: `url(${bgSignup})` }}>
      <Link to="/" data-tip="Página inicial">
        <img src={logoImage} alt="Logo" className="content-logo" />
      </Link>

      <ReactTooltip place="bottom" type="dark" effect="solid" />

      <div className="content-form">
        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="form-inline">
            <div>
              <Input name="name" type="text" placeholder="Seu nome completo" autoFocus />
            </div>
          </div>

          <Input name="email" type="email" placeholder="Seu e-mail aqui" />

          <div className="form-inline">
            <div>
              <Input name="password" type="password" placeholder="Digite uma senha" />
            </div>

            <div>
              <Input name="confirmPassword" type="password" placeholder="Confirme a senha" />
            </div>
          </div>

          <button type="submit">
              {loading ? 'Carregando ...' : 'Cadastrar'}
            </button>
        </Form>

        <div className="content-footer">
          <p>Já possui conta?&nbsp;&nbsp;<Link to="/entrar">Entrar</Link></p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
