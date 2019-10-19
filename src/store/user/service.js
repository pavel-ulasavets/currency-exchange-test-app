import { CurrenciesBasket } from 'store/constants';

/**
 * @typedef Pocket
 * @property {Currencies} currency
 * @property {Number} balance
 */

/**
 * @typedef UserInfo
 *
 * @property {String} username
 * @property {[]Pocket} pockets
 */


/**
 * fetches information for a give user
 *
 * @param {String} userId
 * @param {Promise<UserInfo>}
 */
export function fetchUserInfo(userId) { /* eslint-disable-line */
  return Promise.resolve({
    username: "Pavel Ulasavets",
      pockets: CurrenciesBasket.map(currency => ({
        balance: Math.floor(Math.random() * 1000),
        currency
      }))
  });
}
