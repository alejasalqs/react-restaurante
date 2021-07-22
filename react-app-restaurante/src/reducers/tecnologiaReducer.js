import { types } from "../types/types";

const initialState = {
  checking: true,
  tecnologia: [],
  activeTecnologia: null,
};

export const tecnologiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.tecnologiaLoaded:
      return {
        ...state,
        tecnologia: action.payload,
      };

    default:
      return state;
  }
};
