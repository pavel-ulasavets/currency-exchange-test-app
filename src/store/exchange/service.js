import axios from 'axios';

// constants
const FINANCE_API_KEY = '8640054f6bbadfc3b53d8273c9e6e772';
const FINANCE_API_HOST = 'http://data.fixer.io/api/';

/**
 * fetches a list with the latest exchange rates
 */
export function fetchLatestExchangeRates(currencies = ['USD', 'GBP', 'PLN', 'EUR']) {
  const symbols = currencies.length > 0 ? `&symbols=${currencies.join(',')}` : '';

  return axios(`${FINANCE_API_HOST}/latest?access_key=${FINANCE_API_KEY}${symbols}`)
    .then(({ data }) => data);
}
