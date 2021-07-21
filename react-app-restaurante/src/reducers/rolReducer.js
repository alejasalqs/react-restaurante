import { types } from "../types/types";

const initialState = {
  checking: true,
  rols: [],
  activeRol: null,
};

export const rolReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.rolLoaded:
      return {
        ...state,
        rols: action.payload,
      };

    default:
      return state;
  }
};
