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

export const getExchangeRate = createSelector(
  (state) => state.exchange.sourceCurrency,
  (state) => state.exchange.targetCurrency,
  (state) => state.exchange.exchangeRates,
  (sourceCurrency, targetCurrency, exchangeRates) => {
    const haveValuesForBoth = !!exchangeRates[sourceCurrency] && !!exchangeRates[targetCurrency];

    if (!haveValuesForBoth) {
      return;
    }

    return exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
  }
);

export const getRequestAmount = (state) => state.exchange.requestAmount;

export const getTargetAmount = createSelector(
  getExchangeRate,
  getRequestAmount,
  (exchangeRate, requestAmount) => {
    return requestAmount * exchangeRate;
  }
);

export const getExchangeRatesPollerId = (state) => {
  return state.exchange.exchangeRatesPollerId;
}
