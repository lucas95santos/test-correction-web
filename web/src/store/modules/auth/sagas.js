import { takeLatest, call, put, all } from 'redux-saga/effects';
// services
import api from '../../../services/api';
import history from '../../../services/history';
// actions
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'session', {
    email,
    password
  });

  const { token, user } = response.data;

  if (!user.active) {
    alert('Usuário desativado');
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn)
]);
