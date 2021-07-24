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

    default:
      return state;
  }
};
