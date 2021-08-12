import { types } from "../types/types";

const initialState = {
  checking: true,
  vinos: [],
  activeVino: null,
};

export const vinosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveVinos:
      return {
        ...state,
        activeVino: action.payload,
      };

    case types.removeActiveVinos:
      return {
        ...state,
        activeVino: null,
      };

    case types.vinosLoaded:
      return {
        ...state,
        vinos: action.payload,
      };

    case types.addVinos:
      return {
        ...state,
        vinos: [...state.vinos, action.payload],
      };

    case types.deleteVinos:
      return {
        ...state,
        vinos: state.vinos.filter(
          (vino) => vino.codigo !== action.payload.codigo
        ),
        activeBebidaCaliente: null,
      };

    default:
      return state;
  }
};
