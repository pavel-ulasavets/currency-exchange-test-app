// globals
import { combineReducers } from 'redux';
// reducers
import userReducer from 'store/user/reducer';
import exchangeReducer from 'store/exchange/reducer';

export default combineReducers({
  user: userReducer,
  exchange: exchangeReducer
});
