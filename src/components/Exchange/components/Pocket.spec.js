import React from 'react';
import { mount } from 'enzyme';

// components
import Pocket from './Pocket';
import { getSymbolForCurrency } from 'utils';

const ALL_CURRENCIES = ['PLN', 'USD', 'EUR'];

describe('Pocket', () => {
  describe('renders correctly as', () => {
    it('displays a drop down with currencies', () => {
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={10}
        />
      );

      const dropdown = mounted.find('input[name="currencies"]');
      expect(dropdown).toHaveLength(1);
      expect(dropdown.prop('value')).toBe('PLN');
    });

    it('displays an input field for entering of amount for coversion', () => {
      const expectedAmountForConversion = 10;
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={expectedAmountForConversion}
        />
      );

      const input = mounted.find('input[name="amount-for-conversion"]');
      expect(input).toHaveLength(1);
      expect(input.prop('value').indexOf(expectedAmountForConversion) >= 0).toBe(true);
    });

    it('displays a pocket balance', () => {
      const pocketCurrency = 'PLN';
      const pocketBalance = 500;
      const expectedBalanceLabel = `Balance: ${pocketBalance} ${getSymbolForCurrency(pocketCurrency)}`
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={pocketCurrency}
          pocketBalance={pocketBalance}
          amountForConversion={10}
        />
      );

      const balance = mounted.find('p[name="pocket-balance"]');
      expect(balance).toHaveLength(1);
      expect(balance.text()).toBe(expectedBalanceLabel);
    });
  })

  describe('behaves correctly as', () => {
    xit('calls onCurrencyChanged when user changes a selected value in the dropdown', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={10}
          onCurrencyChanged={spy}
        />
      );

      const dropdown = mounted.find('input[name="currencies"]');
      dropdown.simulate('change', { target: { value: 'EUR' } });

      expect(spy).toHaveBeenCalledWith('EUR');
    });

    it('calls onAmountForConversionChanged when user changes a value for currency exchange', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={10}
          onAmountForConversionChanged={spy}
        />
      );

      const dropdown = mounted.find('input[name="amount-for-conversion"]');
      dropdown.simulate('change', { target: { value: '100' } });

      expect(spy).toHaveBeenCalledWith(100);
    });

    it('shows the "Exceed balance" message when amount of request is higher than amount of funds available', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={-1000}
          onAmountForConversionChanged={spy}
        />
      );

      const message = mounted.find('p[name="conversion-message"]');

      expect(message.text()).toBe('Exceeds balance');
    });

    it('does not show the "Exceed balance" message when amount of request is smailler than amount of funds available', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={2000}
          onAmountForConversionChanged={spy}
        />
      );

      const message = mounted.find('p[name="conversion-message"]');

      expect(message.text()).toBe('');
    });

    it('adds "grayedout" class to a component whose value is zero', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={0}
          onAmountForConversionChanged={spy}
        />
      );

      const textfield = mounted.find('EnhancedNumberField');

      expect(textfield.prop('grayedout')).toBe(true);
    });

    it('adds "grayedout" class to a component if requestedAmount > balance', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={100}
          amountForConversion={-200}
          onAmountForConversionChanged={spy}
        />
      );

      const textfield = mounted.find('EnhancedNumberField');

      expect(textfield.prop('grayedout')).toBe(true);
    });

    it('does not add "grayedout" class to a component if requestedAmount <= balance', () => {
      const spy = jest.fn();
      const mounted = mount(
        <Pocket
          currencies={ALL_CURRENCIES}
          pocketCurrency={'PLN'}
          pocketBalance={500}
          amountForConversion={200}
          onAmountForConversionChanged={spy}
        />
      );

      const textfield = mounted.find('EnhancedNumberField');

      expect(textfield.prop('grayedout')).toBe(false);
    });

  });
});
