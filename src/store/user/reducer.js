import { ActionTypes } from "./constants";

const initialState = {
  isInitialized: false,
  username: '',
  pockets: []
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.SET_ACTIVE_USER_INFO:
      return {
        ...state,
        ...payload,
        isInitialized: true,
      };

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
