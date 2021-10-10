import * as actions from "../actions/actionTypes";

const userReducer = (userState = null, action) => {
  switch (action.type) {
    // returns new state
    case actions.LOGIN:
      return action.payload.user;

    case actions.LOGOUT:
      return null;

    default:
      return userState;
  }
};

export default userReducer;
