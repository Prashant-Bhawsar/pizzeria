// reducers.js
const initialState = {
  orders: [],
  orderIdCounter: 1,
  orderLimit: 10, // Maximum number of orders
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      let payload = { ...action.payload };
      if (state.orders.length >= state.orderLimit) {
        return {
          ...state,
          errorMessage: "Not taking any order for now", // Set error message
        };
      } else {
        return {
          ...state,
          orders: [...state.orders, payload],
          orderIdCounter: state.orderIdCounter + 1,
          errorMessage: null, // Clear error message
        };
      }
    case "UPDATE_ORDER_STAGE":
      console.log(action.payload.time);
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.stage }
            : order
        ),
      };
    case "UPDATE_ORDER_TIME":
      return {
        ...state,
        orders: state.orders.map((order) => {
          return { ...order, time: action.payload.time };
        }),
      };
    case "UPDATE_ORDER_STAGE_TIME":
      return {
        ...state,
        orders: state.orders.map((order) => {
          return { ...order, time: action.payload.time };
        }),
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
