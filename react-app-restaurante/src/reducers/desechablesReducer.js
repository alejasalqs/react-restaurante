import { types } from "../types/types";

const initialState = {
  checking: true,
  desechables: [],
  activeDesechable: null,
};

export const desechablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveDesechables:
      return {
        ...state,
        activeDesechable: action.payload,
      };

    case types.removeActiveDesechables:
      return {
        ...state,
        activeDesechable: null,
      };

    case types.desechablesLoaded:
      return {
        ...state,
        desechables: action.payload,
      };

    case types.addDesechables:
      return {
        ...state,
        desechables: [...state.desechables, action.payload],
      };

    case types.deleteDesechables:
      return {
        ...state,
        desechables: state.desechables.filter(
          (desechable) => desechable.codigo !== action.payload.codigo
        ),
        activeDesechable: null,
      };

    default:
      return state;
  }
};
