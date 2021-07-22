import { types } from "../types/types";

const initialState = {
  checking: true,
  equipos: [],
  activeEquipos: null,
};

export const equiposReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.equiposLoaded:
      return {
        ...state,
        equipos: action.payload,
      };

    default:
      return state;
  }
};
