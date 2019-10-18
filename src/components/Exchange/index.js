// global
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/icons/SwapVerticalCircleRounded';
import { Button, IconButton } from '@material-ui/core';

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
  setAmountForExchange,
  setCurrencies
} from 'store/exchange/actions';

import {
  makeTransfer
} from 'store/user/actions';

// components
import Pocket from './components/Pocket';

export function Exchange(props) {
  const lackOfFunds = props.fromPocket.balance < props.requestAmount;

  return (
    <div className="exchange-container">
      <div className="pockets-container">
        <Pocket
          currencies={props.currencies}
          pocketBalance={props.fromPocket.balance}
          pocketCurrency={props.fromPocket.currency}
          amountForConversion={-props.requestAmount}
          onCurrencyChanged={props.onSourceCurrencyChanged}
          onAmountForConversionChanged={props.onRequestAmountChanged}
        />
        <div className="buttons-row">
          <IconButton onClick={() => props.onSwapClicked(props.toPocket.currency, props.fromPocket.currency)}>
            <Icon />
          </IconButton>
        </div>
        <Pocket
          classNames='target-pocket'
          currencies={props.currencies}
          pocketBalance={props.toPocket.balance}
          pocketCurrency={props.toPocket.currency}
          amountForConversion={props.targetAmount}
          onCurrencyChanged={props.onTargetCurrencyChanged}
        />
      </div>
      <div className="submit-button-row">
        <Button
          variant="contained"
          disabled={lackOfFunds}
          color="secondary"
          onClick={() => props.onExchangeClicked({
            sourceCurrency: props.fromPocket.currency,
            targetCurrency: props.toPocket.currency,
            amount: props.requestAmount,
            exchangeRate: props.exchangeRate
          })}
        >
          Exchange
        </Button>
      </div>
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
  // methods
  onSourceCurrencyChanged: PropTypes.func.isRequired,
  onTargetCurrencyChanged: PropTypes.func.isRequired,
  onRequestAmountChanged: PropTypes.func.isRequired,
  onSwapClicked: PropTypes.func.isRequired,
  onExchangeClicked: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onSourceCurrencyChanged: setSourceCurrency,
  onTargetCurrencyChanged: setTargetCurrency,
  onRequestAmountChanged: setAmountForExchange,
  onSwapClicked: setCurrencies,
  onExchangeClicked: makeTransfer
};

const mapStateToProps = (state) => ({
  userName: getActiveUserName(state),
  currencies: getPocketsCurrencies(state),
  ...getPocketsEngagedInExchange(state),
  ...getExchangeDetails(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
