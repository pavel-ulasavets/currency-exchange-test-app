import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';

// local
import {
  parseTextField,
  testTextFieldValue
} from './utils';

export default function EnhancedNumberField(props) {
  const sign = ['- ', '', '+ '][Math.sign(props.value) + 1];
  const formattedText = `${sign}${Math.abs(props.value)}`;
  const [inputValue, setInputValue] = useState({ number: props.value, text: formattedText });

  return (
    <Input
      name={props.name}
      type="text"
      autoComplete="off"
      className={props.grayedout ? "grayedout" : ""}
      disableUnderline
      value={
        props.value === inputValue.number ? inputValue.text : formattedText
      }
      onChange={(e) => {
        const inputValue = e.target.value || '0';
        const isInputValid = testTextFieldValue(inputValue);

        if (!isInputValid) {
          console.warn('EnhancedNumberField: incorrect input. Ignoring');
          return;
        }

        const numericValue = parseTextField(inputValue);

        setInputValue({
          number: numericValue,
          text: inputValue
        });

        if (props.value !== numericValue) {
          props.onChange(numericValue);
        }
      }}
    />
  );
}

EnhancedNumberField.propTypes = {
  // properties
  value: PropTypes.number,
  name: PropTypes.string,
  grayedout: PropTypes.bool,
  // hooks
  onChange: PropTypes.func
};

EnhancedNumberField.defaultProps = {
  value: 0,
  name: '',
  onChange: () => null
};
