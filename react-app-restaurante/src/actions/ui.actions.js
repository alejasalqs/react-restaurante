import { types } from "../types/types";

export const openModal = (modalType) => {
  switch (modalType) {
    case "employees":
      return { type: types.uiOpenEmpleadosModal };

    case "jobs":
      return { type: types.uiOpenPuestosModal };

    case "tables":
      return { type: types.uiOpenTableModal };

    default:
      return {};
  }
};

export const closeModal = (modalType) => {
  switch (modalType) {
    case "employees":
      return { type: types.uiCloseEmpleadosModal };

    case "jobs":
      return { type: types.uiClosePuestosModal };

    case "tables":
      return { type: types.uiCloseTableModal };

    default:
      return {};
  }
};
