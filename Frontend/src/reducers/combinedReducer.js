import { combineReducers } from "redux";
import userReducer from "./userReducer";
import paymentReducer from "./paymentReducer";

const combinedReducer = combineReducers({
  // first state is user and its reducer to take care of all actions
  user: userReducer,
  payment : paymentReducer
});

export default combinedReducer;
