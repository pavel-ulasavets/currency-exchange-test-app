import { getActiveUserPockets } from './selectors';
import { ActionTypes } from './constants';


export function createSetActiveUserInfo(info) {
  return {
    type: ActionTypes.SET_ACTIVE_USER_INFO,
    payload: info
  };
}

/**
 * verifies validity of a specified transaction amount
 *
 * @param {Number} amount
 * @return {?String} errorMsg
 */
function verifyTransactionAmount(amount) {
  if (typeof amount !== 'number') {
    return 'Amount is of incorrect type'
  }

  if (amount < 0) {
    return 'Amount can not be negative';
  }

  return '';
}

/**
 * verifies validation of a provided currency
 *
 * @param {Currencies} currency
 * @param {[]Currencies} allCurrencies
 */
function verifyTransactionCurrency(currency, allCurrencies) {
  if (!allCurrencies.includes(currency)) {
    return 'Unrecognized currency';
  }

  return '';
}

/**
 * checks validity of a transaction based on its currency and amount of money
 *
 * @param {Currencies} currency
 * @param {SVGAnimatedNumber} amount
 * @param {Object} applicationState
 */
function verifyTransaction(currency, amount, state) {
  const allCurrencies = getActiveUserPockets(state).map(pkt => pkt.currency);

  return verifyTransactionAmount(amount) || verifyTransactionCurrency(currency, allCurrencies);
}

/**
 * puts a specified amount of money to a specified account
 *
 * @param {Currencies} currency
 * @param {Number} amount
 * @param {Object} state
 * @return {Object}
 */
export function createPutMoneyAction(currency, amount, state) {
  const errMsg = verifyTransaction(currency, amount, state);

  if (errMsg) {
    return {
      type: ActionTypes.FAILED_TRANSACTION,
      error: errMsg
    }
  }

  return {
    type: ActionTypes.PUT_MONEY,
    payload: {
      currency,
      amount
    }
  };
}

/**
 * @typedef {Object} Transfer
 * @property {Currencies} sourceCurrency
 * @property {Currencies} targetCurrency
 * @property {Number} exchangeRate
 * @property {Number} amount
 */

/**
 * withdraws a given amount of money from a specified account
 *
 * @param {Currencies} currency
 * @param {Number} amount
 * @param {Object} state
 * @return {Object} action
 */
export function createWithdrawMoneyAction(currency, amount, state) {
  const errMsg = verifyTransaction(currency, amount, state);

  if (errMsg) {
    return {
      type: ActionTypes.FAILED_TRANSACTION,
      error: errMsg
    }
  }

  const pockets = getActiveUserPockets(state);
  const sourcePocket = pockets.find(pkt => pkt.currency === currency);

  if (sourcePocket.balance < amount) {
    return {
      type: ActionTypes.FAILED_TRANSACTION,
      error: errMsg
    }
  }

  return {
    type: ActionTypes.WITHDRAW_MONEY,
    payload: {
      currency,
      amount
    }
  };
}
