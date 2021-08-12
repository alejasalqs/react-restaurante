import { types } from "../types/types";

const initialState = {
  checking: true,
  bebidas_caliente: [],
  activeBebidaCaliente: null,
};

export const bebidaCalienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveBebidaCaliente:
      return {
        ...state,
        activeBebidaCaliente: action.payload,
      };

    case types.removeActiveBebidaCaliente:
      return {
        ...state,
        activeBebidaCaliente: null,
      };

    case types.bebidaCalienteLoaded:
      return {
        ...state,
        bebidas_caliente: action.payload,
      };

    case types.addBebidaCaliente:
      return {
        ...state,
        bebidas_caliente: [...state.bebidas_caliente, action.payload],
      };

    case types.deleteBebidaCaliente:
      return {
        ...state,
        bebidas_caliente: state.bebidas_caliente.filter(
          (bebidas) => bebidas.codigo !== action.payload.codigo
        ),
        activeBebidaCaliente: null,
      };

    default:
      return state;
  }
};
