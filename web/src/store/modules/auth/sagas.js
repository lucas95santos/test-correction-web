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
    toast.success('Bem vindo, usuário!');
  } catch (err) {
    toast.error('Falha na autenticação, verifique suas credenciais');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn)
]);
