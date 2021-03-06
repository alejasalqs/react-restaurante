import { types } from "../types/types";

const initialState = {
  checking: true,
  bebidas_gaseosa: [],
  activeBebidaGaseosa: null,
};

export const bebidaGaseosaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveBebidaGaseosa:
      return {
        ...state,
        activeBebidaGaseosa: action.payload,
      };

    case types.removeActiveBebidaGaseosa:
      return {
        ...state,
        activeBebidaGaseosa: null,
      };

    case types.bebidaGaseosaLoaded:
      return {
        ...state,
        bebidas_gaseosa: action.payload,
      };

    case types.addBebidaGaseosa:
      return {
        ...state,
        bebidas_gaseosa: [...state.bebidas_gaseosa, action.payload],
      };

    case types.deleteBebidaGaseosa:
      return {
        ...state,
        bebidas_gaseosa: state.bebidas_gaseosa.filter(
          (bebidas) => bebidas.codigo !== action.payload.codigo
        ),
        activeBebidaCaliente: null,
      };

    default:
      return state;
  }
};
