/**
 * @enum {String} Currencies // based on ISO 4217
 */

/**
 * returns a symbol for a provided currency
 *
 * @example
 * getSymbolForCurrency('EUR') // returns €
 *
 * @param {Currencies} currency
 * @return {String}
 */
export function getSymbolForCurrency(currency) {
  switch (currency) {
    case 'EUR':
      return '€';

    case 'USD':
      return '$';

    case 'GBP':
      return '£';

    case 'PLN':
      return 'zł';

    default:
      return '';
  }
}
