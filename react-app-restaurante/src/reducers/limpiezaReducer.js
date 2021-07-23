import { types } from "../types/types";

const initialState = {
  checking: true,
  limpieza: [],
  activeLimpieza: null,
};

export const limpiezaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveLimpieza:
      return {
        ...state,
        activeLimpieza: action.payload,
      };

    case types.removeActiveLimpieza:
      return {
        ...state,
        activeLimpieza: null,
      };

    case types.limpiezaLoaded:
      return {
        ...state,
        limpieza: action.payload,
      };

    default:
      return state;
  }
};
