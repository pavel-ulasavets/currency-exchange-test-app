import { store } from 'store';
import { getActiveUserPockets } from './selectors';
import { ActionTypes } from './constants';

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
 */
function verifyTransaction(currency, amount) {
  const allCurrencies = getActiveUserPockets(store.getState()).map(pkt => pkt.currency);

  return verifyTransactionAmount(amount) || verifyTransactionCurrency(currency, allCurrencies);
}

/**
 * puts a specified amount of money to a specified account
 *
 * @param {Currencies} currency
 * @param {Number} amount
 */
export function putMoney(currency, amount) {
  const errMsg = verifyTransaction(currency, amount);

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
 */
export function withdrawMoney(currency, amount) {
  const errMsg = verifyTransaction(currency, amount);

  if (errMsg) {
    return {
      type: ActionTypes.FAILED_TRANSACTION,
      error: errMsg
    }
  }

  const pockets = getActiveUserPockets(store.getState());
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


/**
 * makes a transfer from a pocket with sourceCurrency to a pocket with targetCurrency
 *
 * @param {Transfer} transfer
 * @return {Boolean} true if transfer is successfull or false otherwise
 */
export function makeTransfer(transfer) {
  return dispatch => {
    const withdrawal = withdrawMoney(transfer.sourceCurrency, transfer.amount);
    dispatch(withdrawal);

    if (!withdrawal.error) {
      dispatch(putMoney(transfer.targetCurrency, transfer.exchangeRate * transfer.amount))
    }
  };
}
