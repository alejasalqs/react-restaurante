import { types } from "../types/types";

const initialState = {
  checking: true,
  buffets: [],
  activeBuffet: null,
};

export const buffetReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveBuffets:
      return {
        ...state,
        activeBuffet: action.payload,
      };

    case types.removeActiveBuffets:
      return {
        ...state,
        activeBuffet: null,
      };

    case types.buffetsLoaded:
      return {
        ...state,
        buffets: action.payload,
      };

    default:
      return state;
  }
};
