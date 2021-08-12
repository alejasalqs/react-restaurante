import { types } from "../types/types";

const initialState = {
  checking: true,
  users: [],
  activeUser: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveUser:
      return {
        ...state,
        activeUser: action.payload,
      };

    case types.removeActiveUser:
      return {
        ...state,
        activeUser: null,
      };

    case types.userLoaded:
      return {
        ...state,
        users: action.payload,
      };

    case types.addUser:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case types.deleteUser:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.codigo !== action.payload.codigo
        ),
        activeUser: null,
      };

    default:
      return state;
  }
};
