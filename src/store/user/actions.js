import {
  createPutMoneyAction,
  createWithdrawMoneyAction,
  createSetActiveUserInfo
} from './actionCreators';

import { fetchUserInfo } from './service';

/**
 * fetches a user info by a provided userId
 *
 * @param {String} userId
 */
export function fetchActiveUserInfo(userId) {
  return (dispatch) => {
    return fetchUserInfo(userId)
      .then((userInfo) => dispatch(createSetActiveUserInfo(userInfo)))
      .catch(() => {
        console.error('Failed to fetch a user with userId=', userId);
        // some retry logic may be implemented here
      });
  };
}

/**
 * makes a transfer from a pocket with sourceCurrency to a pocket with targetCurrency
 *
 * @param {Transfer} transfer
 * @return {Boolean} true if transfer is successfull or false otherwise
 */
export function makeTransfer(transfer) {
  return (dispatch, getState) => {
    const state = getState();
    const withdrawal = createWithdrawMoneyAction(transfer.sourceCurrency, transfer.amount, state);
    dispatch(withdrawal);

    if (!withdrawal.error) {
      const targetAmount = transfer.exchangeRate * transfer.amount;
      const putMoneyAction = createPutMoneyAction(transfer.targetCurrency, targetAmount, state);

      dispatch(putMoneyAction);
    }
  };
}
