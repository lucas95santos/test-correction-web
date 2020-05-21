import { takeLatest, put, call, all } from 'redux-saga/effects';
// services
import api from '../../../services/api';
// actions
import { listAllSuccess } from './actions';

export function* listAll({ payload }) {
  const { token } = payload;

  try {
    const response = yield call(api.get, 'classes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { schoolClasses } = response.data;

    yield put(listAllSuccess(schoolClasses));
  } catch (err) {
    console.log(err);
  }
}

export default all([
  takeLatest('@schoolClass/LIST_ALL_REQUEST', listAll)
]);