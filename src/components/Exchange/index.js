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
import {
  getPocketsEngagedInExchange,
  getExchangeDetails
} from 'store/exchange/selectors';
// actions
import {
  setSourceCurrency,
  setTargetCurrency,
  setAmountForExchange
} from 'store/exchange/actions';

// components
import Pocket from './components/Pocket';

export function Exchange(props) {
  return (
    <div className="exchange-container">
       <Pocket
        currencies={props.currencies}
        pocketBalance={props.fromPocket.balance}
        pocketCurrency={props.fromPocket.currency}
        amountForConversion={-props.requestAmount}
        onCurrencyChanged={props.onSourceCurrencyChanged}
        onAmountForConversionChanged={props.onRequestAmountChanged}
      />
      <Pocket
        classNames='target-pocket'
        currencies={props.currencies}
        pocketBalance={props.toPocket.balance}
        pocketCurrency={props.toPocket.currency}
        amountForConversion={props.targetAmount}
        onCurrencyChanged={props.onTargetCurrencyChanged}
      />
    </div>
  );
}

Exchange.propTypes = {
  // properties
  userName: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  fromPocket: PropTypes.object.isRequired,
  toPocket: PropTypes.object.isRequired,
  requestAmount: PropTypes.number,
  targetAmount: PropTypes.number,
  exchangeRate: PropTypes.number,
  // hooks
  onSourceCurrencyChanged: PropTypes.func.isRequired,
  onTargetCurrencyChanged: PropTypes.func.isRequired,
  onRequestAmountChanged: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onSourceCurrencyChanged: setSourceCurrency,
  onTargetCurrencyChanged: setTargetCurrency,
  onRequestAmountChanged: setAmountForExchange
};

const mapStateToProps = (state) => ({
  userName: getActiveUserName(state),
  currencies: getPocketsCurrencies(state),
  ...getPocketsEngagedInExchange(state),
  ...getExchangeDetails(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
