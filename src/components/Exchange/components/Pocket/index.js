// global
import React from "react";
import PropTypes from "prop-types";
import {
  MenuItem,
  Select,
  Input,
  FormControl,
  FormHelperText,
  FormGroup
} from '@material-ui/core';

import './pocket.css';

// local
import { getSymbolForCurrency, floorToPositionAfterDot } from 'utils';

export default function Pocket(props) {
  const lackOfFunds = props.pocketBalance + props.amountForConversion < 0;

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
        <FormHelperText name="pocket-balance" error={lackOfFunds}>
          Balance: {floorToPositionAfterDot(props.pocketBalance)} {getSymbolForCurrency(props.pocketCurrency)}
        </FormHelperText>
      </FormControl>
      <FormGroup row>
        <FormControl margin="normal" className="amount-for-conversion-wrapper">
          <Input
            name="amount-for-conversion"
            type="number"
            disableUnderline
            value={floorToPositionAfterDot(Math.abs(props.amountForConversion))}
            onChange={(e) => props.onAmountForConversionChanged(floorToPositionAfterDot(+e.target.value))}
          />
          <FormHelperText name="conversion-message" classes={{ label: "conversion-message"}}>
            {
              lackOfFunds ? 'Exceeds balance' : ''
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
