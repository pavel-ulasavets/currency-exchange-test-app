import { store } from 'store';
import { getPocketsEngagedInExchange } from './selectors';

import { ActionTypes } from './constants';

/**
 * sets a source currency of exchange to one specified
 *
 * NOTE: in case when source currency equals a target currency - it behaves like swap
 *
 * @param {Currencies} sourceCurrency
 */
export function setSourceCurrency(sourceCurrency) {
  const { toPocket, fromPocket } = getPocketsEngagedInExchange(store.getState());

  if (toPocket.currency !== sourceCurrency) {
    return {
      type: ActionTypes.SET_SOURCE_CURRENCY,
      payload: sourceCurrency
    }
  }

  // keep currencies selectors in different states
  return setCurrencies(sourceCurrency, fromPocket.currency)
}

/**
 * sets a target currency of exchange to one specified
 *
 * NOTE: in case a target currency equals a currenly selected source currency - it behaves like swap
 *
 * @param {Currencies} targetCurrency
 */
export function setTargetCurrency(targetCurrency) {
  const { toPocket, fromPocket } = getPocketsEngagedInExchange(store.getState());

  if (targetCurrency !== fromPocket.currency) {
    return {
      type: ActionTypes.SET_TARGET_CURRENCY,
      payload: targetCurrency
    }
  }

  // keep currencies selectors in different states
  return setCurrencies(toPocket.currency, targetCurrency);
}

/**
 * resets exchanges currencies to ones specified
 *
 * @param {Currencies} sourceCurrency
 * @param {Currencies} targetCurrency
 */
export function setCurrencies(sourceCurrency, targetCurrency) {
  return {
    type: ActionTypes.SET_CURRENCIES,
    payload: {
      sourceCurrency,
      targetCurrency
    }
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
