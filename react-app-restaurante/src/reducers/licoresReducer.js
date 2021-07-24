import { types } from "../types/types";

const initialState = {
  checking: true,
  licores: [],
  activeLicor: null,
};

export const licoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveLicores:
      return {
        ...state,
        activeLicor: action.payload,
      };

    case types.removeActiveLicores:
      return {
        ...state,
        activeLicor: null,
      };

    case types.licoresLoaded:
      return {
        ...state,
        licores: action.payload,
      };

    default:
      return state;
  }
};
