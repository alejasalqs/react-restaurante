import { types } from "../types/types";

const initialState = {
  checking: true,
  consecutivos: [],
  activeConsecutivo: null,
};

export const consecutivosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.consecutivosLoaded:
      return {
        ...state,
        consecutivos: action.payload,
      };

    default:
      return state;
  }
};
