import { ActionTypes } from './constants';

const initialState = {
  requestAmount: 0,
  sourceCurrency: 'USD',
  targetCurrency: 'EUR',
  exchangeRates: {},
  exchangeRatesPollerId: null
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

    case ActionTypes.UPDATE_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload
      };

    default:
      return state;
  }
}

export default exchangeReducer;
