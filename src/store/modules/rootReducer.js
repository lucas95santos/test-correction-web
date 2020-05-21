import { combineReducers } from 'redux';
// reducers
import auth from './auth/reducer';
import user from './user/reducer';
import schoolClass from './schoolClass/reducer';

export default combineReducers({
  auth,
  user,
  schoolClass
});
