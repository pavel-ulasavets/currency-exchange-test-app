import React from 'react';
import { mount } from 'enzyme';

// components
import Pocket from './Pocket';

const ALL_CURRENCIES = ['PLN', 'USD', 'EUR'];

describe('Pocket', () => {
  it('renders a drop down with currencies', () => {
    const mounted = mount(
      <Pocket
        currencies={ALL_CURRENCIES}
        pocketCurrency={'PLN'}
        pocketBalance={500}
        amountForConversion={10}
      />
    );

    const dropdown = mounted.findWhere(el => el.is('Select') && el.prop('name') === 'currencies');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.prop('value')).toBe('PLN');
  });
});
