import { ActionTypes } from './constants';

/**
 * resets exchanges currencies to ones specified
 *
 * @param {Currencies} sourceCurrency
 * @param {Currencies} targetCurrency
 */
export function createSetCurrenciesAction(sourceCurrency, targetCurrency) {
  return {
    type: ActionTypes.SET_CURRENCIES,
    payload: {
      sourceCurrency,
      targetCurrency
    }
  }
}

export function createSetAmountForExchangeAction(amount) {
  return {
    type: ActionTypes.SET_REQUEST_AMOUNT,
    payload: amount
  };
}

export function createSetTargetAmountForExchangeAction(amount) {
  return {
    type: ActionTypes.SET_TARGET_AMOUNT,
    payload: amount
  };
}

export function createSetExchangeRatesPollerIdAction(id) {
  return {
    type: ActionTypes.SET_EXCHANGE_RATE_POLLER_ID,
    payload: id
  }
}

export function createUpdateExchangeRatesAction(exchangeRates) {
  return {
    type: ActionTypes.UPDATE_EXCHANGE_RATES,
    payload: exchangeRates
  }
}
