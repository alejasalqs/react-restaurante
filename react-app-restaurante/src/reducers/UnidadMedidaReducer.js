import { types } from "../types/types";

const initialState = {
  checking: true,
  unidades_medida: [],
  activeUnidadMedida: null,
};

export const unidadMedidaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveUnidadMedida:
      return {
        ...state,
        activeUnidadMedida: action.payload,
      };

    case types.removeActiveUnidadMedida:
      return {
        ...state,
        activeUnidadMedida: null,
      };

    case types.unidadMedidaLoaded:
      return {
        ...state,
        unidades_medida: action.payload,
      };

    default:
      return state;
  }
};
