
/**
 * parses a specially formatted text field
 *
 * @param {String} text
 * @return {Number}
 */
export function parseTextField(text = '0') {
  // rollsback test field formatting (removes extraspace between a sign and number; removes "+"" sign)
  const refinedValue = text.replace(/(\+|\s)/, '').replace(/^(-|\+)$/, '0');

  return parseFloat(refinedValue);
}

const NUMERIC_VALUE_REGEX = /^(\+|-)?\s?\d*(\.\d{0,2})?$/;

/**
 * tests if a provided text matches numeric value pattern
 *
 * @param {String} text
 * @return {Boolean}
 */
export function testTextFieldValue(text) {
  return NUMERIC_VALUE_REGEX.test(text);
}
