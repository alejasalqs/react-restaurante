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

export const startJobsAddNew = (nombre, rol) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("positions", { nombre, rol }, "POST");

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewJob(body.position));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewJob = (job) => ({
  type: types.addJob,
  payload: job,
});

export const updateJob = (job) => ({
  type: types.editJob,
  payload: job,
});

export const startDeletingJob = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`positions/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteJob(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteJob = (codigo) => ({
  type: types.deleteJob,
  payload: { codigo },
});
