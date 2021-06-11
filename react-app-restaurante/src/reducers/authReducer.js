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
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
