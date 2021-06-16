import { types } from "../types/types";

const initialState = {
  checking: true,
  employees: [
    {
      codigo: 1,
      cedula: "117270430",
      nombre: "Alejandro",
      apellido1: "Salguero",
      apellido2: "Quiros",
      telefono: 84469756,
      puesto: "Chef",
      restaurant: "Patito SA",
    },
    {
      codigo: 2,
      cedula: "11287965",
      nombre: "María",
      apellido1: "Cedeño",
      apellido2: "Aguero",
      telefono: 88679025,
      puesto: "Mesera",
      restaurant: "Patito SA",
    },
    {
      codigo: 3,
      cedula: "1110567823",
      nombre: "Jorge",
      apellido1: "Quirós",
      apellido2: "Ramírez",
      telefono: 883373798,
      puesto: "Mesero",
      restaurant: "Patito SA",
    },
  ],
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
          (e) => e.codigo !== state.activeEmployee.codigo
        ),
        activeEmployee: null,
      };

    default:
      return state;
  }
};
