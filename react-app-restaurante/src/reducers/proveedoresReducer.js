import { types } from "../types/types";

const initialState = {
  checking: true,
  suppliers: [],
  activeSupplier: null,
};

export const proveedoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveSupplier:
      return {
        ...state,
        activeSupplier: action.payload,
      };

    case types.removeActiveSupplier:
      return {
        ...state,
        activeSupplier: null,
      };

    case types.supplierLoaded:
      return {
        ...state,
        suppliers: action.payload,
      };

    case types.addSupplier:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    case types.deleteSupplier:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.codigo !== action.payload.codigo
        ),
        activeSupplier: null,
      };

    default:
      return state;
  }
};
