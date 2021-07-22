import { types } from "../types/types";

const initialState = {
  checking: true,
  bitacora: [],
  activeConsecutivo: null,
};

export const bitacoraReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.bitacoraLoaded:
      return {
        ...state,
        bitacora: action.payload,
      };

    default:
      return state;
  }
};
