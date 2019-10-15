// globals
import { combineReducers } from 'redux';
// reducers
import userReducer from 'store/user/reducer';

export default combineReducers({
  user: userReducer
});
