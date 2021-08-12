import { types } from "../types/types";

const initialState = {
  checking: true,
  especialidades: [],
  activeEspecialidad: null,
};

export const especialidadesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveEspecialidad:
      return {
        ...state,
        activeEspecialidad: action.payload,
      };

    case types.removeActiveEspecialidad:
      return {
        ...state,
        activeEspecialidad: null,
      };

    case types.especialidadLoaded:
      return {
        ...state,
        especialidades: action.payload,
      };

    case types.addEspecialidad:
      return {
        ...state,
        especialidades: [...state.especialidades, action.payload],
      };

    case types.deleteEspecialidad:
      return {
        ...state,
        especialidades: state.especialidades.filter(
          (especialidad) => especialidad.codigo !== action.payload.codigo
        ),
        activeConsecutivo: null,
      };

    default:
      return state;
  }
};
