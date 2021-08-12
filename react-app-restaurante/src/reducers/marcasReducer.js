import { types } from "../types/types";

const initialState = {
  checking: true,
  brands: [],
  activeBrand: null,
};

export const marcasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveBrand:
      return {
        ...state,
        activeBrand: action.payload,
      };

    case types.removeActiveBrand:
      return {
        ...state,
        activeBrand: null,
      };

    case types.brandLoaded:
      return {
        ...state,
        brands: action.payload,
      };

    case types.addBrand:
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };

    case types.deleteBrand:
      return {
        ...state,
        brands: state.brands.filter(
          (brand) => brand.codigo !== action.payload.codigo
        ),
        activeBrand: null,
      };

    default:
      return state;
  }
};
