import { types } from "../types/types";

const initialState = {
  empleadosModalOpen: false,
  puestosModalOpen: false,
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

    case types.uiOpenPuestosModal:
      return {
        ...state,
        puestosModalOpen: true,
      };

    case types.uiClosePuestosModal:
      return {
        ...state,
        puestosModalOpen: false,
      };

    default:
      return state;
  }
};
