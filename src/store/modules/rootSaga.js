import { all } from 'redux-saga/effects';
// sagas
import auth from './auth/sagas';
import user from './user/sagas';
import schoolClass from './schoolClass/sagas';

export default function* rootSaga() {
  return yield all([auth, user, schoolClass]);
}
