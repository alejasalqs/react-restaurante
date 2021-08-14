import { types } from "../types/types";

const initialState = {
  checking: true,
  clients: [],
  activeClient: null,
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveClientes:
      return {
        ...state,
        activeClient: action.payload,
      };

    case types.removeActiveClientes:
      return {
        ...state,
        activeClient: null,
      };

    case types.clientesLoaded:
      return {
        ...state,
        clients: action.payload,
      };

    case types.addClientes:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case types.deleteClientes:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.codigo !== action.payload.codigo
        ),
        activeClient: null,
      };

    default:
      return state;
  }
};
