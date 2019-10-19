import { createPutMoneyAction, createWithdrawMoneyAction } from './actionCreators';

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
