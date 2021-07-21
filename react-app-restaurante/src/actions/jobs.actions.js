import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveJob = (job) => ({
  type: types.setActiveJob,
  payload: job,
});

export const removeActiveJob = () => ({
  type: types.removeActiveJob,
});

export const startLoadingJobs = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("positions");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.position));
    } else {
      console.log("");
    }
  };
};

const loaded = (jobs) => ({
  type: types.jobsLoaded,
  payload: jobs,
});

export const addJob = (job) => ({
  type: types.addJob,
  payload: job,
});

export const updateJob = (job) => ({
  type: types.editJob,
  payload: job,
});

export const deleteJob = () => ({
  type: types.deleteJob,
});
