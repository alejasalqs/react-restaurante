import { types } from "../types/types";

const initialState = {
  checking: true,
  suppliers: [],
  activeSupplier: null,
};

export const proveedoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.supplierLoaded:
      return {
        ...state,
        suppliers: action.payload,
      };

    default:
      return state;
  }
};
