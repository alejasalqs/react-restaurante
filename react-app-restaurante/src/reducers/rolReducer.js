import { types } from "../types/types";

const initialState = {
  checking: true,
  rols: [],
  activeRol: null,
};

export const rolReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveRol:
      return {
        ...state,
        activeRol: action.payload,
      };

    case types.removeActiveRol:
      return {
        ...state,
        activeRol: null,
      };
    case types.rolLoaded:
      return {
        ...state,
        rols: action.payload,
      };

    default:
      return state;
  }
};
