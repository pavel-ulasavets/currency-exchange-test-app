const initialState = {
  username: 'Pavel Ulasavets',
  pockets: [
    {
      currency: 'PLN',
      balance: 20
    },
    {
      currency: 'EUR',
      balance: 40
    },
    {
      currency: 'USD',
      balance: 60
    }
  ]
};

function userReducer(state = initialState, action) { // eslint-disable-line
  return state;
}

export default userReducer;
