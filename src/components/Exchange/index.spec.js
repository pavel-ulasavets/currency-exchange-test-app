import React from 'react';
import { mount } from 'enzyme';

// components
import { Exchange } from './index';

const ALL_CURRENCIES = ['PLN', 'USD', 'EUR'];
const MOCKED_PROPS = {
  userName: "Pavel Ulasavets",
  currencies: ALL_CURRENCIES,
  fromPocket: {
    currency: 'PLN',
    balance: 500
  },
  toPocket: {
    currency: 'USD',
    balance: 100
  },
  requestAmount: 100,
  targetAmount: 40,
  exchangeRate: 0.25,
  startPollingExchangeRates: jest.fn(),
  stopPollingExchangeRates: jest.fn(),
  onSwapClicked: jest.fn(),
  onExchangeClicked: jest.fn(),
  onSourceCurrencyChanged: jest.fn(),
  onTargetCurrencyChanged: jest.fn(),
  onTargetAmountChanged: jest.fn(),
  onRequestAmountChanged: jest.fn()
};


describe('Exchange', () => {
  describe('renders correctly as', () => {
    it('displays source and target pokets', () => {
      const mounted = mount(
        <Exchange
          {...MOCKED_PROPS}
        />
      );

      const dropdown = mounted.find('Pocket');
      expect(dropdown).toHaveLength(2);
    });
    it('displays exchange rating', () => {
      const mounted = mount(
        <Exchange
          {...MOCKED_PROPS}
        />
      );

      const rating = mounted.find('.exchange-rating');
      expect(rating).toHaveLength(1);
      const props = MOCKED_PROPS;
      const ratingInfo = `1 ${props.fromPocket.currency} = ${props.exchangeRate} ${props.toPocket.currency}`;

      expect(rating.contains(ratingInfo)).toBe(true);
    });

    it('displays "Exchange" button', () => {
      const mounted = mount(
        <Exchange
          {...MOCKED_PROPS}
        />
      );

      const button = mounted.find('button[name="exchange-button"]');
      expect(button).toHaveLength(1);
      expect(button.contains('Exchange')).toBe(true);
    });
  })
});
