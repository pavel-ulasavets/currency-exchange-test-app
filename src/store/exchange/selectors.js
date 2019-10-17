// global
import { createSelector } from 'reselect';
// local
import { getActiveUserPockets } from 'store/user/selectors';

export const getPocketsEngagedInExchange = createSelector(
  getActiveUserPockets,
  (state) => state.exchange.sourceCurrency,
  (state) => state.exchange.targetCurrency,
  (allPockets, sourceCurrency, targetCurrency) => {
    const fromPocket = allPockets.find(pkt => pkt.currency === sourceCurrency);
    const toPocket = allPockets.find(pkt => pkt.currency === targetCurrency);

    return {
      fromPocket: fromPocket || allPockets[0],
      toPocket: toPocket || allPockets[1]
    };
  }
);

export const getExchangeDetails = createSelector(
  (state) => state.exchange.exchangeRate,
  (state) => state.exchange.requestAmount,
  (exchangeRate, requestAmount) => {
    return {
      exchangeRate,
      requestAmount,
      targetAmount: requestAmount * exchangeRate
    }
  }
);
