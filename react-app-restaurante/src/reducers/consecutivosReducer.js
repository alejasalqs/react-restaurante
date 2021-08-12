import { types } from "../types/types";

const initialState = {
  checking: true,
  consecutivos: [],
  activeConsecutivo: null,
};

export const consecutivosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveConsecutivos:
      return {
        ...state,
        activeConsecutivo: action.payload,
      };

    case types.removeActiveConsecutivos:
      return {
        ...state,
        activeConsecutivo: null,
      };

    case types.consecutivosLoaded:
      return {
        ...state,
        consecutivos: action.payload,
      };

    case types.addConsecutivos:
      return {
        ...state,
        consecutivos: [...state.consecutivos, action.payload],
      };

    case types.deleteConsecutivos:
      return {
        ...state,
        consecutivos: state.consecutivos.filter(
          (consecutivo) => consecutivo.codigo !== action.payload.codigo
        ),
        activeConsecutivo: null,
      };

    default:
      return state;
  }
};
