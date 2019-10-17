import { ActionTypes } from './constants';

const initialState = {
  requestAmount: 200,
  exchangeRate: 0.2,
  sourceCurrency: 'USD',
  targetCurrency: 'EUR'
};

function exchangeReducer(state = initialState, action) { // eslint-disable-line
  switch(action.type) {
    case ActionTypes.SET_SOURCE_CURRENCY:
      return {
        ...state,
        sourceCurrency: action.payload
      };

    case ActionTypes.SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload
      };

    case ActionTypes.SET_REQUEST_AMOUNT:
      return {
        ...state,
        requestAmount: action.payload
      };

    case ActionTypes.SET_CURRENCIES:
      return {
        ...state,
        targetCurrency: action.payload.targetCurrency,
        sourceCurrency: action.payload.sourceCurrency
      };

    default:
      return state;
  }
}

export default exchangeReducer;
