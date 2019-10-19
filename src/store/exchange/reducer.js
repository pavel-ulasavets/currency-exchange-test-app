import { ActionTypes } from './constants';

const initialState = {
  requestAmount: 0,
  targetAmount: 0,
  sourceCurrency: 'USD',
  targetCurrency: 'EUR',
  exchangeRates: {},
  exchangeRatesPollerId: null
};

function exchangeReducer(state = initialState, action) { // eslint-disable-line
  switch(action.type) {

    case ActionTypes.SET_SOURCE_CURRENCY: {
      const exchangeRate = state.exchangeRates[state.targetCurrency] / state.exchangeRates[action.payload];

      return {
        ...state,
        sourceCurrency: action.payload,
        targetAmount: state.requestAmount * exchangeRate
      };
    }

    case ActionTypes.SET_TARGET_CURRENCY: {
      const targetCurrency = action.payload;
      const exchangeRate = state.exchangeRates[targetCurrency] / state.exchangeRates[state.sourceCurrency];

      return {
        ...state,
        targetCurrency,
        targetAmount: state.requestAmount * exchangeRate
      };
    }

    case ActionTypes.SET_CURRENCIES: {
      const targetCurrency = action.payload.targetCurrency;
      const sourceCurrency = action.payload.sourceCurrency;
      const exchangeRate = state.exchangeRates[targetCurrency] / state.exchangeRates[sourceCurrency];

      return {
        ...state,
        targetCurrency: action.payload.targetCurrency,
        sourceCurrency: action.payload.sourceCurrency,
        targetAmount: state.requestAmount * exchangeRate
      };
    }

    case ActionTypes.SWAP_CURRENCIES: {
      return {
        ...state,
        targetCurrency: state.sourceCurrency,
        sourceCurrency: state.targetCurrency,
        requestAmount: state.targetAmount,
        targetAmount: state.requestAmount
      };
    }

    case ActionTypes.SET_REQUEST_AMOUNT: {
      const exchangeRate = state.exchangeRates[state.targetCurrency] / state.exchangeRates[state.sourceCurrency];

      return {
        ...state,
        requestAmount: action.payload,
        targetAmount: action.payload * exchangeRate
      };
    }

    case ActionTypes.SET_TARGET_AMOUNT: {
      const exchangeRate = state.exchangeRates[state.sourceCurrency] / state.exchangeRates[state.targetCurrency];

      return {
        ...state,
        requestAmount: exchangeRate * action.payload,
        targetAmount: action.payload
      };
    }

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
