import { types } from "../types/types";

const initialState = {
  checking: true,
  comestibles: [],
  activeComestible: null,
};

export const comestiblesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.comestiblesLoaded:
      return {
        ...state,
        comestibles: action.payload,
      };

    default:
      return state;
  }
};
