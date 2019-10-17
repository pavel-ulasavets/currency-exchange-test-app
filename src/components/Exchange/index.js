// global
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import "./exchange.css";

// local
// selectors
import {
  getActiveUserName,
  getPocketsCurrencies
} from 'store/user/selectors';

// components
import Pocket from './components/Pocket';

export function Exchange(props) {
  return (
    <div className="exchange-container">
       <Pocket
        currencies={props.currencies}
        pocketBalance={500}
        pocketCurrency={'PLN'}
        amountForConversion={-1000}
        onCurrencyChanged={newValue => console.log(newValue)}
      />
      <Pocket
        classNames='target-pocket'
        currencies={props.currencies}
        pocketBalance={500}
        pocketCurrency={'USD'}
        amountForConversion={1000 / 4}
        onCurrencyChanged={newValue => console.log(newValue)}
      />
    </div>
  );
}

Exchange.propTypes = {
  userName: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  userName: getActiveUserName(state),
  currencies: getPocketsCurrencies(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
