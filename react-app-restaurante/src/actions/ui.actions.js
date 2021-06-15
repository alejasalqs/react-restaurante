import { types } from "../types/types";

export const openModal = (modalType) => {
  switch (modalType) {
    case "employees":
      return { type: types.uiOpenEmpleadosModal };

    case "jobs":
      return { type: types.uiOpenPuestosModal };

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

    default:
      return {};
  }
};
