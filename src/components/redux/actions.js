// actions.js
export const placeOrder = (order) => ({
  type: "PLACE_ORDER",
  payload: order,
});

export const updateOrderStage = (orderId, stage) => ({
  type: "UPDATE_ORDER_STAGE",
  payload: { orderId, stage },
});
export const updateOrderTime = () => ({
  type: "UPDATE_ORDER_TIME",
});
export const updateOrderStageTime = () => ({
  type: "UPDATE_ORDER_STAGE_TIME",
});
export const resetOrderStageTime = () => ({
  type: "RESET_ORDER_STAGE_TIME",
});
export const deleteOrder = (orderId) => ({
  type: "DELETE_ORDER",
  payload: orderId,
});
