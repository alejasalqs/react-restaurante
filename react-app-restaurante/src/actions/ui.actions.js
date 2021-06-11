import { types } from "../types/types";

export const openModal = () => ({
  type: types.uiOpenEmpleadosModal,
});

export const closeModal = () => ({
  type: types.uiCloseEmpleadosModal,
});
