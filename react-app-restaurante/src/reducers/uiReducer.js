import { types } from "../types/types";

const initialState = {
  empleadosModalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenEmpleadosModal:
      return {
        ...state,
        empleadosModalOpen: true,
      };

    case types.uiCloseEmpleadosModal:
      return {
        ...state,
        empleadosModalOpen: false,
      };

    default:
      return state;
  }
};
