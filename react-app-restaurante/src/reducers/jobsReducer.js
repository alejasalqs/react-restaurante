import { types } from "../types/types";

const initialState = {
  checking: true,
  jobs: [],
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

    case types.addJob:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };

    case types.editJob:
      return {
        ...state,
        jobs: state.jobs.map((j) =>
          j.codigo === action.payload.codigo ? action.payload : j
        ),
      };

    case types.deleteJob:
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.codigo !== action.payload.codigo),
        activeJob: null,
      };

    case types.jobsLoaded:
      return {
        ...state,
        jobs: action.payload,
      };

    default:
      return state;
  }
};
