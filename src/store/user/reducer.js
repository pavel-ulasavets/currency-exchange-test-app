const initialState = {
  username: 'Pavel Ulasavets',
  pockets: [
    {
      currency: 'PLN',
      balance: 666
    },
    {
      currency: 'EUR',
      balance: 666
    },
    {
      currency: 'USD',
      balance: 666
    }
  ]
};

function userReducer(state = initialState, action) { // eslint-disable-line
  return state;
}

export default userReducer;
