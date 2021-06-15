import { types } from "../types/types";

export const addNewEmployee = (employee) => ({
  type: types.addEmployee,
  payload: employee,
});

export const editEmployee = (employee) => ({
  type: types.editEmployee,
  payload: employee,
});

export const deleteEmployee = () => ({
  type: types.deleteEmployee,
});

export const setActiveEmployee = (employee) => ({
  type: types.setActiveEmployee,
  payload: employee,
});

export const removeActiveEmployee = () => ({
  type: types.removeActiveEmployee,
});

export const startLoadingEmployees = () => ({
  type: types.addEmployee,
});
