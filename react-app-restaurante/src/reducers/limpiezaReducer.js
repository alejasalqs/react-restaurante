import { types } from "../types/types";

const initialState = {
  checking: true,
  limpieza: [],
  activeLimpieza: null,
};

export const limpiezaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveLimpieza:
      return {
        ...state,
        activeLimpieza: action.payload,
      };

    case types.removeActiveLimpieza:
      return {
        ...state,
        activeLimpieza: null,
      };

    case types.limpiezaLoaded:
      return {
        ...state,
        limpieza: action.payload,
      };

    case types.addLimpieza:
      return {
        ...state,
        limpieza: [...state.limpieza, action.payload],
      };

    case types.deleteLimpieza:
      return {
        ...state,
        limpieza: state.limpieza.filter(
          (limp) => limp.codigo !== action.payload.codigo
        ),
        activeLimpieza: null,
      };
    default:
      return state;
  }
};
