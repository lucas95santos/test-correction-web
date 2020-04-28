import { all } from 'redux-saga/effects';
// sagas
import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
