import { store } from 'store';
import { getPocketsEngagedInExchange } from './selectors';

import { ActionTypes } from './constants';

export function setSourceCurrency(sourceCurrency) {
  const { toPocket, fromPocket } = getPocketsEngagedInExchange(store.getState());

  if (toPocket.currency !== sourceCurrency) {
    return {
      type: ActionTypes.SET_SOURCE_CURRENCY,
      payload: sourceCurrency
    }
  }

  // keep currencies selectors in different states
  return {
    type: ActionTypes.SET_CURRENCIES,
    payload: {
      targetCurrency: fromPocket.currency,
      sourceCurrency
    }
  }
}

export function setTargetCurrency(targetCurrency) {
  return {
    type: ActionTypes.SET_TARGET_CURRENCY,
    payload: targetCurrency
  }
}

export function setAmountForExchange(amount) {
  return {
    type: ActionTypes.SET_REQUEST_AMOUNT,
    payload: amount
  };
}

export function setExchangeRate(rate) {
  return {
    type: ActionTypes.SET_EXCHANGE_RATE,
    payload: rate
  }
}
