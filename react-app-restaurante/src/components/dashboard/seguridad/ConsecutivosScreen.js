import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveConsecutivo,
  startLoadingConsecutivos,
} from "../../../actions/consecutivos.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { ConsecutivosModal } from "../../ui/modals/ConsecutivosModal";

export const ConsecutivosScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Tipo",
        accessor: "tipo",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Valor",
        accessor: "valor_consecutivo",
      },
      {
        Header: "Prefijo",
        accessor: "prefijo",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingConsecutivos());
  }, [dispatch]);

  const { consecutivos } = useSelector((state) => state.consecutivos);

  const handleOnclik = (consecutivo) => {
    //console.log(job);
    dispatch(setActiveConsecutivo(consecutivo));
    dispatch(openModal("consecutivos"));
  };

  const handleAdd = () => {
    dispatch(openModal("consecutivos"));
  };
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Consecutivos</h1>
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
                <i className="fas fa-user-plus mr-2"></i>
                Agregar
              </button>
              <Table
                columns={columns}
                data={consecutivos}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <ConsecutivosModal />
    </div>
  );
};
