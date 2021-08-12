import { types } from "../types/types";

const initialState = {
  checking: true,
  comestibles: [],
  activeComestible: null,
};

export const comestiblesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveComestibles:
      return {
        ...state,
        activeComestible: action.payload,
      };

    case types.removeActiveComestibles:
      return {
        ...state,
        activeComestible: null,
      };

    case types.comestiblesLoaded:
      return {
        ...state,
        comestibles: action.payload,
      };

    case types.addComestibles:
      return {
        ...state,
        comestibles: [...state.comestibles, action.payload],
      };

    case types.deleteComestibles:
      return {
        ...state,
        comestibles: state.comestibles.filter(
          (comestible) => comestible.codigo !== action.payload.codigo
        ),
        activeComestible: null,
      };

    default:
      return state;
  }
};
