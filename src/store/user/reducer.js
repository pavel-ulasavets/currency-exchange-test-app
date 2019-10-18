import { ActionTypes } from "./constants";

const initialState = {
  username: "Pavel Ulasavets",
  pockets: [
    {
      currency: "PLN",
      balance: 20
    },
    {
      currency: "EUR",
      balance: 40
    },
    {
      currency: "USD",
      balance: 60
    }
  ]
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.PUT_MONEY:
      return {
        ...state,
        pockets: state.pockets.map(pkt => {
          if (pkt.currency !== payload.currency) {
            return pkt;
          }

          return {
            ...pkt,
            balance: pkt.balance + payload.amount
          }
        })
      };

    case ActionTypes.WITHDRAW_MONEY:
      return {
        ...state,
        pockets: state.pockets.map(pkt => {
          if (pkt.currency !== payload.currency) {
            return pkt;
          }

          return {
            ...pkt,
            balance: pkt.balance - payload.amount
          }
        })
      };

    default:
      return state;
  }
}

export default userReducer;
