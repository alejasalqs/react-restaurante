import { types } from "../types/types";

const initialState = {
  checking: true,
  brands: [],
  activeBrand: null,
};

export const marcasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.brandLoaded:
      return {
        ...state,
        brands: action.payload,
      };

    default:
      return state;
  }
};