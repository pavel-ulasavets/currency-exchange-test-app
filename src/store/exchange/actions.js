import { store } from 'store';
import {
  getPocketsEngagedInExchange ,
  getExchangeRatesPollerId
} from './selectors';
import {
  fetchLatestExchangeRates
} from './service';

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

/**
 * starts polling exchange rates with a specified update rate
 *
 * @param {Number} interval
 */
export function startPollingExchangeRates(interval = 10000) {
  return (dispatch, getState) => {
    const state = getState();
    let pollerId = getExchangeRatesPollerId(state);

    if (pollerId) {
      // timer is already running
      return;
    }

    function fetch() {
      return fetchLatestExchangeRates()
        .then(({ rates }) => dispatch(createUpdateExchangeRatesAction(rates)))
        .catch(() => {
          console.warn('Something went wrong while fetching exchange rates.. Will ret-try in', interval, 'ms')
        });
    }

    fetch();

    const action = createSetExchangeRatesPollerIdAction(setInterval(fetch, interval));
    dispatch(action);
  };
}

/**
 * stops earlier started poller.
 * Does nothing in case when there is no active exchange rates poller
 */
export function stopPollingExchangeRates() {
  return (dispatch, getState) => {
    const state = getState();
    const pollerId = getExchangeRatesPollerId(state);

    if (!pollerId) {
      // nothing to stop
      return;
    }

    clearInterval(pollerId);
    dispatch(createSetExchangeRatesPollerIdAction(null));
  };
}
