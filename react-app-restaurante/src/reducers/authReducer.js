import { types } from "../types/types";

const initialState = {
  checking: true,
  logged: false,
  //id
  //name
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        checking: false,
        logged: true,
        ...action.payload,
      };

    case types.logout:
      return {
        ...state,
        checking: false,
        logged: false,
      };
    default:
      return state;
  }
};
