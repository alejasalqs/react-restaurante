import { types } from "../types/types";

const initialState = {
  checking: true,
  employees: [],
  activeEmployee: null,
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveEmployee:
      return {
        ...state,
        activeEmployee: action.payload,
      };

    case types.removeActiveEmployee:
      return {
        ...state,
        activeEmployee: null,
      };

    case types.addEmployee:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case types.editEmployee:
      return {
        ...state,
        employees: [
          ...state.employees,
          state.employees.map((e) =>
            e.codigo === action.payload.codigo ? action.payload : e
          ),
        ],
      };

    case types.deleteEmployee:
      return {
        ...state,
        employees: state.employees.filter(
          (e) => e.codigo !== action.payload.codigo
        ),
        activeEmployee: null,
      };

    case types.employeesLoaded:
      return {
        ...state,
        employees: action.payload,
      };

    default:
      return state;
  }
};
