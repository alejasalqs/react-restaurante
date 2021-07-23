import { types } from "../types/types";

const initialState = {
  checking: true,
  countries: [],
  activeCountry: null,
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveCountry:
      return {
        ...state,
        activeCountry: action.payload,
      };

    case types.removeActiveCountry:
      return {
        ...state,
        activeCountry: null,
      };

    case types.countryLoaded:
      return {
        ...state,
        countries: action.payload,
      };

    default:
      return state;
  }
};
