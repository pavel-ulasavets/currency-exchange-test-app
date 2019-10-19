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

/**
 * formats a provided number cutting all numbers after .XX
 *
 * @param {Number} amount
 */
export function floorToPositionAfterDot(amount, position = 2) {
  if (position < 0) {
    return amount;
  }

  if (typeof amount !== 'number') {
    return amount;
  }

  const multiplier = Math.pow(10, position);
  return Math.floor(amount * multiplier) / multiplier;
}
