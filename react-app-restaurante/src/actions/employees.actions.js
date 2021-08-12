import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const editEmployee = (employee) => ({
  type: types.editEmployee,
  payload: employee,
});

export const startDeletingEmployee = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`employees/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteEmployee(codigo));
    } else {
      console.log("");
    }
  };
};

export const deleteEmployee = (codigo) => ({
  type: types.deleteEmployee,
  payload: { codigo },
});

export const setActiveEmployee = (employee) => ({
  type: types.setActiveEmployee,
  payload: employee,
});

export const removeActiveEmployee = () => ({
  type: types.removeActiveEmployee,
});

export const startLoadingEmployees = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("employees");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.employees));
    } else {
      console.log("");
    }
  };
};

const loaded = (employees) => ({
  type: types.employeesLoaded,
  payload: employees,
});

export const startEmployeeAddNew = ({
  codigo,
  cedula,
  nombre,
  apellido1,
  apellido2,
  telefono1,
  telefono2,
  restaurante,
  puesto,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "employees",
        {
          codigo,
          cedula,
          nombre,
          apellido1,
          apellido2,
          telefono1,
          telefono2,
          restaurante,
          puesto,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewEmployee(body.employee));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewEmployee = (employee) => ({
  type: types.addEmployee,
  payload: employee,
});
