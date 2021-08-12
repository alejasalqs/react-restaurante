import { types } from "../types/types";

const initialState = {
  checking: true,
  tables: [],
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

    case types.tableLoaded:
      return {
        ...state,
        tables: action.payload,
      };

    case types.addTable:
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };

    case types.deleteTable:
      return {
        ...state,
        tables: state.tables.filter(
          (table) => table.codigo !== action.payload.codigo
        ),
        activeTable: null,
      };
    default:
      return state;
  }
};
