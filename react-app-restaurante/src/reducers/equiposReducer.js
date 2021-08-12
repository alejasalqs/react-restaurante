import { types } from "../types/types";

const initialState = {
  checking: true,
  equipos: [],
  activeEquipos: null,
};

export const equiposReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveEquipos:
      return {
        ...state,
        activeEquipos: action.payload,
      };

    case types.removeActiveEquipos:
      return {
        ...state,
        activeEquipos: null,
      };

    case types.equiposLoaded:
      return {
        ...state,
        equipos: action.payload,
      };

    case types.addEquipos:
      return {
        ...state,
        equipos: [...state.equipos, action.payload],
      };

    case types.deleteEquipos:
      return {
        ...state,
        equipos: state.equipos.filter(
          (equipo) => equipo.codigo !== action.payload.codigo
        ),
        activeDesechable: null,
      };

    default:
      return state;
  }
};
