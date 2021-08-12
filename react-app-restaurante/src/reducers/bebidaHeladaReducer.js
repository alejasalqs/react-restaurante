import { types } from "../types/types";

const initialState = {
  checking: true,
  bebidas_helada: [],
  activeBebidaHelada: null,
};

export const bebidaHeladaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveBebidaHelada:
      return {
        ...state,
        activeBebidaHelada: action.payload,
      };

    case types.removeActiveBebidaHelada:
      return {
        ...state,
        activeBebidaHelada: null,
      };

    case types.bebidaHeladaLoaded:
      return {
        ...state,
        bebidas_helada: action.payload,
      };

    case types.addBebidaHelada:
      return {
        ...state,
        bebidas_helada: [...state.bebidas_helada, action.payload],
      };

    case types.deleteBebidaHelada:
      return {
        ...state,
        bebidas_helada: state.bebidas_helada.filter(
          (bebidas) => bebidas.codigo !== action.payload.codigo
        ),
        activeBebidaCaliente: null,
      };

    default:
      return state;
  }
};
