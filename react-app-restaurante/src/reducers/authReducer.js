import { types } from "../types/types";

const initialState = {
  checking: true,
  //id
  //name
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        checking: false,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
