// global
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// local
import {
  getActiveUserName,
  getPocketsCurrencies
} from 'store/user/selectors';

export function Exchange(props) {
  return (
    <div>
      <div>User name: {props.userName}</div>
      <div>Currencies: {props.currencies.join(',')}</div>
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
