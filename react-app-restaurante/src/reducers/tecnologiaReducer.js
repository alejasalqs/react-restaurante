import { types } from "../types/types";

const initialState = {
  checking: true,
  tecnologia: [],
  activeTecnologia: null,
};

export const tecnologiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveTecnologia:
      return {
        ...state,
        activeTecnologia: action.payload,
      };

    case types.removeActiveTecnologia:
      return {
        ...state,
        activeTecnologia: null,
      };

    case types.tecnologiaLoaded:
      return {
        ...state,
        tecnologia: action.payload,
      };

    case types.addTecnologia:
      return {
        ...state,
        tecnologia: [...state.tecnologia, action.payload],
      };

    case types.deleteTecnologia:
      return {
        ...state,
        tecnologia: state.tecnologia.filter(
          (tecno) => tecno.codigo !== action.payload.codigo
        ),
        activeTecnologia: null,
      };
    default:
      return state;
  }
};
