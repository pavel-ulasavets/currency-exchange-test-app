// global
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// local
import { fetchActiveUserInfo } from 'store/user/actions';
import { isActiveUserInitialized } from 'store/user/selectors';

export function UserProvider(props) {
  useEffect(() => props.fetchActiveUserInfo(props.userId), [props.userId]);

  return (
    <React.Fragment>
      {
        props.isInitialized ? props.children : 'Initializing...'
      }
    </React.Fragment>
  );
}

UserProvider.propTypes = {
  // properties
  isInitialized: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  // methods
  fetchActiveUserInfo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  fetchActiveUserInfo
};

const mapStateToProps = (state) => ({
  userId: 'hardcodedFakeId',
  isInitialized: isActiveUserInitialized(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
