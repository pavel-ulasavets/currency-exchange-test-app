import exchangeReducer from './reducer';
import * as ActionCreators from './actionCreators';

const EXCHANGE_RATES = {
  "PLN": 4.2549,
  "EUR": 1,
  "USD": 1.1104,
  "GBP": 0.8611
}

describe('Exchange reducer', () => {
  it('is initialized with a correct state', () => {
    const expectedInitialState = {
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      exchangeRates: {},
      requestAmount: 0,
      targetAmount: 0,
      exchangeRatesPollerId: null
    };

    expect(exchangeReducer(undefined, {})).toStrictEqual(expectedInitialState);
  });

  describe('makes a source currency switch correctly as', () => {
    it('switches a source currency to a specified one', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 0,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetSourceCurrencyAction('GBP'));

      expect(stateAfter.sourceCurrency).toBe('GBP');
    });

    it('keeps a requestAmount untouched', () => {
      const expectedRequestAmount = 5;
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: expectedRequestAmount,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetSourceCurrencyAction('GBP'));

      expect(stateAfter.requestAmount).toBe(expectedRequestAmount);
    });

    it('recalculates a targetAmount according to a corresponding exchange rate', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: EXCHANGE_RATES,
        requestAmount: 5,
        targetAmount: 0,
        exchangeRatesPollerId: null
      };
      const targetAmount = EXCHANGE_RATES['EUR'] * state.requestAmount / EXCHANGE_RATES['GBP'];
      const expectedTargetAmount = Math.round(targetAmount * 100) / 100;

      const stateAfter = exchangeReducer(state, ActionCreators.createSetSourceCurrencyAction('GBP'));
      expect(stateAfter.targetAmount).toBe(expectedTargetAmount);
    });
  });

  describe('makes a target currency switch correctly as', () => {
    it('switches a target currency to a specified one', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 0,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetTargetCurrencyAction('GBP'));

      expect(stateAfter.targetCurrency).toBe('GBP');
    });

    it('keeps a requestAmount untouched', () => {
      const expectedRequestAmount = 5;
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: expectedRequestAmount,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetTargetCurrencyAction('GBP'));

      expect(stateAfter.requestAmount).toBe(expectedRequestAmount);
    });

    it('recalculates a targetAmount according to a corresponding exchange rate', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: EXCHANGE_RATES,
        requestAmount: 5,
        targetAmount: 0,
        exchangeRatesPollerId: null
      };
      const targetAmount = EXCHANGE_RATES['GBP'] * state.requestAmount / EXCHANGE_RATES['USD'];
      const expectedTargetAmount = Math.round(targetAmount * 100) / 100;

      const stateAfter = exchangeReducer(state, ActionCreators.createSetTargetCurrencyAction('GBP'));
      expect(stateAfter.targetAmount).toBe(expectedTargetAmount);
    });
  });

  describe('performs set of both currencies correctly as', () => {
    it('source currency is update with a new value', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 0,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetCurrenciesAction('GBP', 'PLN'));

      expect(stateAfter.sourceCurrency).toBe('GBP');
    });

    it('target currency is update with a new value', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 0,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetCurrenciesAction('GBP', 'PLN'));

      expect(stateAfter.targetCurrency).toBe('PLN');
    });

    it('keeps a requestAmount untouched', () => {
      const expectedRequestAmount = 5;
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: expectedRequestAmount,
        targetAmount: 0,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSetCurrenciesAction('GBP', 'PLN'));

      expect(stateAfter.requestAmount).toBe(expectedRequestAmount);
    });

    it('recalculates a targetAmount according to a corresponding exchange rate', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: EXCHANGE_RATES,
        requestAmount: 5,
        targetAmount: 0,
        exchangeRatesPollerId: null
      };
      const targetAmount = EXCHANGE_RATES['PLN'] * state.requestAmount / EXCHANGE_RATES['GBP'];
      const expectedTargetAmount = Math.round(targetAmount * 100) / 100;

      const stateAfter = exchangeReducer(state,  ActionCreators.createSetCurrenciesAction('GBP', 'PLN'));
      expect(stateAfter.targetAmount).toBe(expectedTargetAmount);
    });
  });

  describe('performs currencies swap correctly', () => {
    it('moves source currency to target currency', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 5,
        targetAmount: 4.45,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSwapCurrenciesAction());
      expect(stateAfter.targetCurrency).toBe('USD');
    });

    it('moves target currency to source currency', () => {
      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 5,
        targetAmount: 4.45,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSwapCurrenciesAction());
      expect(stateAfter.sourceCurrency).toBe('EUR');
    });

    it('moves source amount to target amount', () => {
      const expectedRequestAmount = 5;
      const expectedTargetAmount = 9;

      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 9,
        targetAmount: 5,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSwapCurrenciesAction());
      expect(stateAfter.requestAmount).toBe(expectedRequestAmount);
    });

    it('moves target amount to source amount', () => {
      const expectedRequestAmount = 5;
      const expectedTargetAmount = 9;

      const state = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRates: {},
        requestAmount: 9,
        targetAmount: 5,
        exchangeRatesPollerId: null
      }

      const stateAfter = exchangeReducer(state, ActionCreators.createSwapCurrenciesAction());
      expect(stateAfter.targetAmount).toBe(expectedTargetAmount);
    });
  });
})
