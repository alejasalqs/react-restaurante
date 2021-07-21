import { types } from "../types/types";

const initialState = {
  checking: true,
  users: [],
  activeUser: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userLoaded:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
