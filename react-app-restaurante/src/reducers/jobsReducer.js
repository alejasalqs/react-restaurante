import { types } from "../types/types";

const initialState = {
  checking: true,
  jobs: [
    {
      codigo: 1,
      nombre: "Chef",
      rol: "externo",
    },
    {
      codigo: 2,
      nombre: "Mesero/a",
      rol: "externo",
    },
    {
      codigo: 3,
      nombre: "Lava Platos",
      rol: "externo",
    },
  ],
  activeJob: null,
};
export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveJob:
      return {
        ...state,
        activeJob: action.payload,
      };

    case types.removeActiveJob:
      return {
        ...state,
        activeJob: null,
      };

    default:
      return state;
  }
};
