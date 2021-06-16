import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTable } from "../../../actions/tables.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { MesasModal } from "../../ui/modals/MesasModal";

export const MesasScreen = () => {
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
        Header: "Sillas",
        accessor: "sillas",
      },
      {
        Header: "Restaurant",
        accessor: "restaurant",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  const { tables } = useSelector((state) => state.tables);

  const handleOnclik = (table) => {
    //console.log(job);
    dispatch(setActiveTable(table));
    dispatch(openModal("tables"));
  };

  const handleAdd = () => {
    dispatch(openModal("tables"));
  };
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Mesas</h1>
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
                <i className="fas fa-plus-circle mr-2"></i>
                Agregar
              </button>
              <Table columns={columns} data={tables} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <MesasModal />
    </div>
  );
};
