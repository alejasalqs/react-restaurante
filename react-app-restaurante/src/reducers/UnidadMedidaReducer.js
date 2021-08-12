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

    case types.addUnidadMedida:
      return {
        ...state,
        unidades_medida: [...state.unidades_medida, action.payload],
      };

    case types.deleteUnidadMedida:
      return {
        ...state,
        unidades_medida: state.unidades_medida.filter(
          (unidad) => unidad.codigo !== action.payload.codigo
        ),
        activeBrand: null,
      };

    default:
      return state;
  }
};
