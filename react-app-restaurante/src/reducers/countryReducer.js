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

    case types.addCountry:
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };

    case types.deleteCountry:
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.codigo !== action.payload.codigo
        ),
        activeCountry: null,
      };

    default:
      return state;
  }
};
