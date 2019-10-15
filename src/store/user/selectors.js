/**
 * selects a currently active user name
 * @param {Object} state
 * @return {String}
 */
export function getActiveUserName(state) {
  return state.user.username;
}

/**
 * @enum {String} Currencies - USD, EUR, PLN
 */

/**
 * @typedef {Object} Pocket
 * @property {Currencies} currency
 * @property {Number} balance
 */

/**
 * returns all pockets available for a user
 * @param {Object} state
 * @return {[]Pocket}
 */
export function getActiveUserPockets(state) {
  return state.user.pockets;
}

/**
 * selects all currencies available in pockets of an active user
 *
 * @param {Object} state
 * @return {[]Currencies}
 */
export function getPocketsCurrencies(state) {
  return getActiveUserPockets(state).map((pocket) => pocket.currency);
}
