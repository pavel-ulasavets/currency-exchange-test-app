import {
  getPocketsEngagedInExchange,
  getExchangeRatesPollerId,
} from './selectors';
import {
  fetchLatestExchangeRates
} from './service';
import * as ActionCreators from './actionCreators';

/**
 * sets a source currency of exchange to one specified
 *
 * NOTE: in case when source currency equals a target currency - it behaves like swap
 *
 * @param {Currencies} sourceCurrency
 */
export function setSourceCurrency(sourceCurrency) {
  return (dispatch, getState) => {
    const { toPocket, fromPocket } = getPocketsEngagedInExchange(getState());

    if (toPocket.currency !== sourceCurrency) {
      const action = ActionCreators.createSetSourceCurrencyAction(sourceCurrency);
      return dispatch(action);
    }

    // keep currencies selectors in different states
    const action = ActionCreators.createSetCurrenciesAction(sourceCurrency, fromPocket.currency);
    dispatch(action);
  }
}

/**
 * sets a target currency of exchange to one specified
 *
 * NOTE: in case a target currency equals a currenly selected source currency - it behaves like swap
 *
 * @param {Currencies} targetCurrency
 */
export function setTargetCurrency(targetCurrency) {
  return (dispatch, getState) => {
    const { toPocket, fromPocket } = getPocketsEngagedInExchange(getState());

    if (targetCurrency !== fromPocket.currency) {
      return ActionCreators.createSetTargetCurrencyAction(targetCurrency);
    }

    // keep currencies selectors in different states
    const action = ActionCreators.createSetCurrenciesAction(toPocket.currency, targetCurrency);
    return dispatch(action);
  }
}

export function setCurrencies(sourceCurrency, targetCurrency) {
  return ActionCreators.createSetCurrenciesAction(sourceCurrency, targetCurrency)
}

/**
 * sets a request amount to a specified value as well as updates a target amount value according
 * to a currently available exchangeRate
 *
 * @param {Number} amount
 */
export function setAmountForExchange(amount) {
  return ActionCreators.createSetAmountForExchangeAction(amount);
}

export function swapCurrencies() {
  return ActionCreators.createSwapCurrenciesAction();
}

/**
 * sets a target amount to a specified value as well as updates a requested amount value according
 * to a currently available exchangeRate
 *
 * @param {Number} amount
 */
export function setTargetAmountForExchange(amount) {
  return ActionCreators.createSetTargetAmountForExchangeAction(amount);
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
        .then(({ rates }) => dispatch(ActionCreators.createUpdateExchangeRatesAction(rates)))
        .catch(() => {
          console.warn('Something went wrong while fetching exchange rates.. Will ret-try in', interval, 'ms')
        });
    }

    fetch();

    const action = ActionCreators.createSetExchangeRatesPollerIdAction(setInterval(fetch, interval));
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
    dispatch(ActionCreators.createSetExchangeRatesPollerIdAction(null));
  };
}
