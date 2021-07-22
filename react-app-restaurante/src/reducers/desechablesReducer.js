import { types } from "../types/types";

const initialState = {
  checking: true,
  desechables: [],
  activeDesechable: null,
};

export const desechablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.desechablesLoaded:
      return {
        ...state,
        desechables: action.payload,
      };

    default:
      return state;
  }
};
