// global
import React from "react";
import PropTypes from "prop-types";
import {
  MenuItem,
  Select,
  TextField,
  FormControl,
  FormHelperText
} from '@material-ui/core';

//import styles from './pocket.css';

// local
import { getSymbolForCurrency } from 'utils';

export default function Pocket(props) {
  const lackOfFunds = props.pocketBalance + props.amountForConversion < 0;

  return (
    <div>
      <FormControl margin="normal">
        <Select
          onChange={(e => props.onCurrencyChanged(e.target.value))}
          value={props.pocketCurrency}
          inputProps={{ name: "currencies" }}
        >
          {
            props.currencies.map(currency => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))
          }
        </Select>
        <FormHelperText name="pocket-balance" error={lackOfFunds}>
          Balance: {props.pocketBalance} {getSymbolForCurrency(props.pocketCurrency)}
        </FormHelperText>
      </FormControl>
      <FormControl margin="normal">
        <TextField
          name="amount-for-conversion"
          type="number"
          value={props.amountForConversion}
          onChange={(e) => props.onAmountForConversionChanged(e.target.value)}
        />
        <FormHelperText name="conversion-message">
          {
            lackOfFunds ? 'Exceeds balance' : ''
          }
        </FormHelperText>
      </FormControl>
    </div>
  );
}

Pocket.propTypes = {
  // properties
  currencies: PropTypes.array.isRequired,
  pocketCurrency: PropTypes.string.isRequired,
  pocketBalance: PropTypes.number.isRequired,
  amountForConversion: PropTypes.number,
  // methods
  onCurrencyChanged: PropTypes.func,
  onAmountForConversionChanged: PropTypes.func
};

Pocket.defaultProps = {
  amountForConversion: 0,
  onCurrencyChanged: () => null,
  onAmountForConversionChanged: () => null
};
