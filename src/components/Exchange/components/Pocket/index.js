// global
import React from "react";
import PropTypes from "prop-types";
import {
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  FormGroup
} from '@material-ui/core';

import './pocket.css';

// local
import * as Utils from 'utils';
import EnhancedNumberField from './components/EnhancedNumberField';
import { floorToPositionAfterDot } from "../../../../utils";

export default function Pocket(props) {
  const insufficientFunds = props.pocketBalance + props.amountForConversion < 0;

  return (
    <div className={`pocket-wrapper ${props.classNames}`}>
      <FormControl margin="normal" className="currencies-wrapper" >
        <Select
          onChange={e => props.onCurrencyChanged(e.target.value)}
          value={props.pocketCurrency}
          inputProps={{ name: "currencies" }}
          disableUnderline
        >
          {
            props.currencies.map(currency => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))
          }
        </Select>
        <FormHelperText name="pocket-balance" error={insufficientFunds}>
          Balance: {`${floorToPositionAfterDot(props.pocketBalance)} ${Utils.getSymbolForCurrency(props.pocketCurrency)}`}
        </FormHelperText>
      </FormControl>
      <FormGroup row>
        <FormControl margin="normal" className="amount-for-conversion-wrapper">
          <EnhancedNumberField
            name="amount-for-conversion"
            grayedout={props.amountForConversion === 0 || insufficientFunds}
            value={props.amountForConversion}
            onChange={value => props.onAmountForConversionChanged(value)}
          />
          <FormHelperText name="conversion-message">
            {
              insufficientFunds ? 'Exceeds balance' : ''
            }
          </FormHelperText>
      </FormControl>
      </FormGroup>
    </div>
  );
}

Pocket.propTypes = {
  // properties
  currencies: PropTypes.array.isRequired,
  pocketCurrency: PropTypes.string.isRequired,
  pocketBalance: PropTypes.number.isRequired,
  amountForConversion: PropTypes.number,
  classNames: PropTypes.string,
  // methods
  onCurrencyChanged: PropTypes.func,
  onAmountForConversionChanged: PropTypes.func
};

Pocket.defaultProps = {
  amountForConversion: 0,
  classNames: '',
  onCurrencyChanged: () => null,
  onAmountForConversionChanged: () => null
};
