import { FETCH_ORDERS_SUCCESS } from "../actions/ordersActions";

const initState = {
  orders: []
};

const ordersReducer = (state = initState, action) => {
  if (action.type === FETCH_ORDERS_SUCCESS) {
    return {
      ...state,
      orders: action.payload
    };
  }

  return state;
};

export default ordersReducer;
