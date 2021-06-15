import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveJob } from "../../../actions/jobs.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { PuestosModal } from "../../ui/modals/PuestosModal";

export const PuestosScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Rol",
        accessor: "rol",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => state.jobs);

  const handleOnclik = (job) => {
    //console.log(job);
    dispatch(setActiveJob(job));
    dispatch(openModal("jobs"));
  };

  const handleAdd = () => {
    dispatch(openModal("jobs"));
  };
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Puestos</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <button
                className="button is-success is-rounded mb-3"
                type="button"
                onClick={handleAdd}
              >
                Agregar
              </button>
              <Table columns={columns} data={jobs} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <PuestosModal />
    </div>
  );
};
