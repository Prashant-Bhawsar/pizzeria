// reducers.js
const initialState = {
  orders: [],
  orderIdCounter: 1,
  orderCompleted: 0,
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
      console.log(action.payload.stage);
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
          if (order.status === 4) {
            return { ...order, time: order.time };
          }
          return { ...order, time: order.time + 1 };
        }),
      };
    case "UPDATE_ORDER_STAGE_TIME":
      return {
        ...state,
        orders: state.orders.map((order) => {
          return { ...order, stageTime: order.stageTime + 1 };
        }),
      };
    case "RESET_ORDER_STAGE_TIME":
      return {
        ...state,
        orders: state.orders.map((order) => {
          return { ...order, stageTime: 0 };
        }),
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case "UPDATE_COMPLETED_ORDER":
      console.log("completed");
      return {
        ...state,
        orderCompleted: state.orderCompleted + 1,
      };
    default:
      return state;
  }
};

export default reducer;
