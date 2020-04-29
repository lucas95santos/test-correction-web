import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
// services
import api from '../../../services/api';
import history from '../../../services/history';
// actions
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password
    });

    const { token, user } = response.data;

    if (!user.active) {
      yield put(signFailure());
      toast.error('Usuário desativado');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
    toast.success(`Bem vindo(a), ${user.name}`);
  } catch (err) {
    toast.error('Falha na autenticação, verifique suas credenciais');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password
    });

    history.push('/entrar');
    toast.success('Cadastro realizado com sucesso');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/entrar');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
