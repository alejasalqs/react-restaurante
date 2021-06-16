import { types } from "../types/types";

const initialState = {
  checking: true,
  tables: [
    {
      codigo: 1,
      nombre: "Panchito",
      numero: 1,
      sillas: 4,
      restaurant: "Patito SA",
    },
    {
      codigo: 2,
      nombre: "Cosa",
      numero: 2,
      sillas: 2,
      restaurant: "Patito SA",
    },
  ],
  activeTable: null,
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveTable:
      return {
        ...state,
        activeTable: action.payload,
      };

    case types.removeActiveTable:
      return {
        ...state,
        activeTable: null,
      };

    default:
      return state;
  }
};
